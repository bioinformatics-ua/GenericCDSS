# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import admin
from django.utils.html import format_html
from django.core.urlresolvers import reverse

from models import Language, Multilingual

# Register your models here.
@admin.register(Language)
class LanguageAdmin(admin.ModelAdmin):
    list_display = ("language", "ckeck_translations")

    def ckeck_translations(self, obj):
        return format_html(
            '<a class="button" href="{}">Check</a>',
            None#reverse('admin:', args=[obj.pk])
        )

@admin.register(Multilingual)
class MultilingualAdmin(admin.ModelAdmin):
    list_display = ("key", "content", "language")
