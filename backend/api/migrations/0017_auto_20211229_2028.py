# Generated by Django 3.2.8 on 2021-12-30 04:28

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0016_auto_20211229_1951'),
    ]

    operations = [
        migrations.RenameField(
            model_name='certificationscales',
            old_name='name',
            new_name='scale_name',
        ),
        migrations.AlterField(
            model_name='certification',
            name='level_scale',
            field=models.ForeignKey(db_column='scale_name', on_delete=django.db.models.deletion.CASCADE, to='api.certificationscales'),
        ),
        migrations.AlterField(
            model_name='usercertifications',
            name='level',
            field=models.ForeignKey(db_column='level', on_delete=django.db.models.deletion.CASCADE, to='api.certificationlevels'),
        ),
    ]
