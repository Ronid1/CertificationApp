# Generated by Django 3.2.8 on 2022-01-08 19:18

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0030_alter_trainingmodule_link'),
    ]

    operations = [
        migrations.AddField(
            model_name='usertraining',
            name='user_certification',
            field=models.ForeignKey(default=0, on_delete=django.db.models.deletion.CASCADE, related_name='trainings_stats', to='api.usercertifications'),
            preserve_default=False,
        ),
    ]
