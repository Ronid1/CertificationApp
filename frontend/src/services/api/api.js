
import axios from 'axios'

// https://dev.to/mmcshinsky/a-simple-approach-to-managing-api-calls-1lo6
// https://css-tricks.com/stay-dry-using-axios-for-api-requests/
// https://codeburst.io/how-to-call-api-in-a-smart-way-2ca572c6fe86

export const client = axios.create({
    baseURL: 'http://127.0.0.1:8000/api',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
})


//Api actions template
export class Api {
    constructor(url) {
        this.endpoint = ('/' + url);
    }

    //returns all data in endpoint
    async getAll() {
        let dataArray;
        try {
            await client.get(this.endpoint).then(res => {
                dataArray = res.data;
            });
            return dataArray;
        }
        catch {
            return null;
        }
    }

    //returns data with primary key = id
    async getId(id) {
        let dataArray;
        try{
            await client.get(this.endpoint+ '/' +id).then(res => {
                dataArray = res.data;
            });
            return dataArray;
        }
        catch{
            return null;
        }
    }

    //returns data with user_id = id
    async findByUserId(id){
        let dataArray;
        try{
            await client.get(this.endpoint+ '/?user_id=' +id).then(res => {
                dataArray =  res.data;
            });
            return dataArray;
        }
        catch {
            return null;
        }
    }
    
    //creates a new line in table
    async createData(data) {

        return await client.post(this.endpoint + '/', data);
    }
    
    //update current line with specific data
    async updateIdWithData(id, data) {
        return await client.patch(this.endpoint+ '/' +id + '/', data);
    }
    
    //delete a line in table
    DeleteId(id) {
        return client.delete(this.endpoint+ '/' +id);
    }
     
    // get data for specific id or full table in readable format
    async printableData(id) {
        let data;
        if (id == undefined)
            data = this.getAll().then(res => {
                //return array with wanted data
                return this.printableDataHook(res);
            });
        
        else
           data = this.getId(id).then(res => {
                //return array with wanted data
                return this.printableDataHook([res]);
            });

        const result = await data;
        return result;
    }

// *************** Hooks ***************

    validateHook(){};
    async printableDataHook(){}

}