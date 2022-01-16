import Form from 'react-bootstrap/Form';
import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import DropdownMultiselect from "react-multiselect-dropdown-bootstrap";
import { UserActions } from '../../services/api/userActions';
import { CertificationsActions } from '../../services/api/certificationsActions';
import { ProfilesActions } from '../../services/api/profilesActions';
import { UserCertificationsActions } from '../../services/api/userCertificationsActions';

function EditUser({show, setShow, newUser, setNewUser, data}){

    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");
    let [name, setName] = useState("");
    let [admin, setAdmin] = useState(false);
    let [role, setRole] = useState("");
    let [certifications, setCertifications] = useState([]);
    let [showError, setShowError] = useState(false)
    let [allCertifications, setAllCertifications] = useState([]);

    useEffect(() => {
        getAllCerts();
        //getAllValues();
    }, [data])

    useEffect(() => {
        if(!show)
            return;

        getAllValues();
        console.log("admin: " + admin)
    }, [show, newUser])
   
    //get all certifications in Db to display
    async function getAllCerts(){
        let certs = new CertificationsActions();
        let temp = [];
        await certs.getAll().then(res => {
            for (let item of res){
                temp.push({key: item.id, label:item.name})
            }
        })
        setAllCertifications(temp);
    }

    function save(){
        if (name == "" || email == "" || password == "" || certifications.length == 0){
            setShowError(true);
            return;
        }
        
        let profileInfo = {
            user_name: name,
            is_admin: admin,
            role: role,
        }

        let userInfo = {
            email: email,
            username: email,
            password: password,
        }

        let user = new UserActions();
        let profile = new ProfilesActions();
        let userCerts = new UserCertificationsActions();

        //if new user- create user, then update profile with same id
        if (newUser)
            createUser(user, profile, userCerts, userInfo, profileInfo);

        else
            editUser(user, profile, userCerts, userInfo, profileInfo)

        //zero all input and close
        zeroAndClose();

    }

    //create a new user, profile and user certifications
    async function createUser(user, profile, userCerts, userInfo, profileInfo){
        let id;
        //create user
        await user.createData(userInfo).then(res => {
            //get id for profile from user
            id = res.data.id
        })
        
        //create profile
        await profile.updateIdWithData(id, profileInfo);

        //create user-certifications
        if (certifications.length > 0){
            for (let cert of certifications){
                await userCerts.createData({certification_id: cert, user_id:id});
            }
        }
    }

    //edit users info, profile and certifications
    async function editUser(user,profile,userCerts, userInfo, profileInfo){
        let id = data. user_id;

        await user.updateIdWithData(id, userInfo);
        await profile.updateIdWithData(id, profileInfo);

        //compare users current certifications to ones selected and add/remove as needed
        await userCerts.findByUserId(id).then(res => {
            //delete certifications
            for (let currentCert of res){
                for (let selecetedCert of certifications){
                    //current certification was also selected
                    if (currentCert.certification_id == selecetedCert)
                        continue;
                }
                // !!!!!! is this buggy and i'll get here no matter what?
                //current certification was no selected -> delete
                userCerts.DeleteId(currentCert.id)

            }

            //add new selected certifications
            for (let selecetedCert of certifications){
                for (let currentCert of res){
                    //selected certification already exists
                    if (currentCert.certification_id == selecetedCert)
                        continue;
                }
                // !!!!!! is this buggy and i'll get here no matter what?

                //create new user certification
                userCerts.createData({certification_id: selecetedCert, user_id:id})
            }
        })
    }

    async function getAllValues(){
        if (newUser)
            return;

        //if we are editing a user - display all user info
        let profile = new ProfilesActions();
        let userCerts = new UserCertificationsActions();
        let myCertification = [];
        
        //get profile info
        await profile.getId(data.user_id).then(res => {
            setAdmin(res.is_admin);
            setRole(res.role);
            myCertification = res.certifications;
        })

        //input user info
        setEmail("Can't Edit Email");
        setPassword("*******");
        setName(data.user_name);

        //get user certifications
        let tempCertList=[];
        for (let cert of myCertification){
            userCerts.getId(cert).then(res => {
                tempCertList.push(res.certification_id.toString())
            })
        }
        setCertifications(tempCertList);        
    }

    function zeroAndClose(){
        setEmail("");
        setPassword("");
        setName("");
        setAdmin(false);
        setRole("");
        setCertifications([]);
        setNewUser(true);
        setShow(false);
    }


    return(
        <Modal show={show}>
        <Modal.Header>
        <Modal.Title>User Configurations</Modal.Title>
        </Modal.Header>
        <Modal.Body>

        <Alert variant="danger" show={showError} onClose={() => setShowError(false)} dismissible>
        <p> Name, Email, Password and Certifications must have a value </p>
        </Alert>
       

        <Form.Group controlId="formLink" className="mb-3">
            <Form.Label>Name:</Form.Label>
            <Form.Control 
            type="text"
            placeholder = "Name"
            value = {name}
            onChange= { (event) => setName(event.target.value) }
            />
        </Form.Group>

        
        <Form.Group controlId="formLink" className="mb-3">
            <Form.Label>Role:</Form.Label>
            <Form.Control 
            type="text"
            placeholder = "Role"
            value = {role}
            onChange= { (event) => setRole(event.target.value) }
            />
        </Form.Group>

        
        <Form.Group controlId="formLink" className="mb-3">
            <Form.Label>Email:</Form.Label>
            <Form.Control 
            type="text"
            placeholder = "Email"
            value = {email}
            disabled = {!newUser ? true:false}
            onChange= { (event) => setEmail(event.target.value) }
            />
        </Form.Group>

        
        <Form.Group controlId="formLink" className="mb-3">
            <Form.Label>Passwrod:</Form.Label>
            <Form.Control 
            type="text"
            placeholder = "Passwrod"
            value = {password}
            onChange= { (event) => setPassword(event.target.value) }
            />
        </Form.Group>


{/* https://github.com/kfrancikowski/react-multiselect-dropdown-bootstrap#readme */}
    Certifications:
    <DropdownMultiselect 
        options={allCertifications} 
        name="certification" 
        selected={certifications}
        handleOnChange= {(selected) => setCertifications(selected)}
    />

    <Form.Check 
            type="checkbox" 
            label="Admin" 
            defaultChecked = {admin}
            value = {admin} 
            onChange= { (event) => setAdmin(event.target.value) }
        />

        </Modal.Body>
        <Modal.Footer>
        <Button variant="secondary" onClick={() => zeroAndClose()}>
            Cancel
        </Button>
        <Button id="btn-primary" onClick={() => save()}> 
            Save
        </Button>
        </Modal.Footer>
    </Modal>
    )

}

export default EditUser;