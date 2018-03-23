# -*- coding: utf-8 -*-
# Generated by Django 1.11.10 on 2018-02-22 16:49
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='profile',
            name='role',
            field=models.PositiveSmallIntegerField(choices=[(1, 'This user is a nurse'), (2, 'This user is a physician'), (3, 'This user is a administrator')], default=1),
        ),
    ]