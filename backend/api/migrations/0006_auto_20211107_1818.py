# Generated by Django 3.2.8 on 2021-11-08 02:18

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('api', '0005_auto_20211107_1253'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='trainingmodule',
            name='type',
        ),
        migrations.AddField(
            model_name='part',
            name='id',
            field=models.BigAutoField(auto_created=True, default=0, primary_key=True, serialize=False, verbose_name='ID'),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='certification',
            name='level_scale',
            field=models.IntegerField(),
        ),
        migrations.AlterField(
            model_name='certificationlevels',
            name='level_scale',
            field=models.IntegerField(),
        ),
        migrations.AlterField(
            model_name='part',
            name='part_number',
            field=models.FloatField(max_length=12),
        ),
        migrations.RemoveField(
            model_name='usercertifications',
            name='level',
        ),
        migrations.AddField(
            model_name='usercertifications',
            name='level',
            field=models.ManyToManyField(to='api.CertificationLevels'),
        ),
        migrations.RemoveField(
            model_name='usercertifications',
            name='trainer',
        ),
        migrations.AlterField(
            model_name='usertraining',
            name='training_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.trainingmodule'),
        ),
        migrations.CreateModel(
            name='Profile',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('role', models.CharField(max_length=80)),
                ('image', models.ImageField(upload_to=None)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.AddField(
            model_name='usercertifications',
            name='trainer',
            field=models.ManyToManyField(related_name='trainer_id', to='api.Profile'),
        ),
        migrations.AlterField(
            model_name='usercertifications',
            name='user_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.profile'),
        ),
        migrations.AlterField(
            model_name='usertraining',
            name='user_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.profile'),
        ),
        migrations.DeleteModel(
            name='User',
        ),
    ]
