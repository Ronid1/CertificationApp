# Generated by Django 3.2.8 on 2022-01-04 05:18

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0029_auto_20220103_2116'),
    ]

    operations = [
        migrations.AlterField(
            model_name='trainingmodule',
            name='link',
            field=models.URLField(null=True, validators=[django.core.validators.URLValidator]),
        ),
    ]
