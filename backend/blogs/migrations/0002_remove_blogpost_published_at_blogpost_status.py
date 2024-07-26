# Generated by Django 4.2.14 on 2024-07-24 12:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('blogs', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='blogpost',
            name='published_at',
        ),
        migrations.AddField(
            model_name='blogpost',
            name='status',
            field=models.CharField(choices=[('ORGL', 'Original'), ('EDIT', 'Edited')], default='Original', max_length=20),
        ),
    ]