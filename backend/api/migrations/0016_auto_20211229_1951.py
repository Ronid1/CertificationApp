# Generated by Django 3.2.8 on 2021-12-30 03:51

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0015_auto_20211229_1948'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='certification',
            name='part',
        ),
        migrations.AlterField(
            model_name='certification',
            name='level_scale',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.certificationscales'),
        ),
        migrations.AlterField(
            model_name='usercertifications',
            name='level',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.certificationlevels'),
        ),
    ]
