# Generated by Django 3.2.8 on 2022-01-09 03:00

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0032_auto_20220108_1716'),
    ]

    operations = [
        migrations.RenameField(
            model_name='usercertifications',
            old_name='level',
            new_name='entered_level',
        ),
    ]
