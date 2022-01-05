# Generated by Django 3.2.8 on 2021-11-07 20:53

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_part'),
    ]

    operations = [
        migrations.CreateModel(
            name='Certification',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=80, unique=True)),
                ('practical', models.BooleanField(default=True)),
                ('part', models.FloatField(max_length=12)),
                ('level_scale', models.IntegerField(max_length=2)),
            ],
        ),
        migrations.CreateModel(
            name='CertificationLevels',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('level_scale', models.IntegerField(max_length=2)),
                ('level', models.CharField(max_length=20)),
            ],
        ),
        migrations.CreateModel(
            name='TrainingModule',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('certification_id', models.CharField(max_length=10)),
                ('name', models.CharField(max_length=80)),
                ('type', models.CharField(max_length=10)),
            ],
        ),
        migrations.CreateModel(
            name='UserTraining',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('user_id', models.CharField(max_length=10)),
                ('training_id', models.CharField(max_length=10)),
                ('completed', models.BooleanField(default=False)),
            ],
        ),
        migrations.RemoveField(
            model_name='part',
            name='id',
        ),
        migrations.AlterField(
            model_name='part',
            name='part_number',
            field=models.FloatField(max_length=12, primary_key=True, serialize=False),
        ),
        migrations.CreateModel(
            name='UserCertifications',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('level', models.IntegerField(max_length=10)),
                ('trainer', models.CharField(max_length=80)),
                ('created_on_date', models.DateField(auto_now_add=True)),
                ('duration', models.DurationField()),
                ('certification_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.certification')),
                ('user_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.user')),
            ],
        ),
    ]