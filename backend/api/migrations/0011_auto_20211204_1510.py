# Generated by Django 3.2.8 on 2021-12-04 23:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0010_auto_20211204_1456'),
    ]

    operations = [
        migrations.DeleteModel(
            name='Part',
        ),
        migrations.AlterField(
            model_name='usercertifications',
            name='level',
            field=models.IntegerField(),
        ),
        migrations.DeleteModel(
            name='CertificationLevels',
        ),
    ]
