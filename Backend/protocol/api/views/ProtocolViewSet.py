# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from rest_framework import viewsets, filters

from rest_framework.filters import OrderingFilter
from django_filters.rest_framework import DjangoFilterBackend

from protocol.api.serializers import ProtocolSerializer
from protocol.models import Protocol

from history.models import History

class ProtocolViewSet(viewsets.ModelViewSet):
    queryset = Protocol.objects.all()
    serializer_class = ProtocolSerializer

    # {
    #     componentId: 1,
    #     label: "Toma anti-diabéticos?",
    #     type: "choice",
    #     options: [{option: "Sim", next: 2}, {option: "Não", next: 3}]
    # }, {
    #     componentId: 2,
    #     label: "Suspender a toma de anti-diabéticos",
    #     type: "action",
    #     next: 3
    # }, {
    #     componentId: 3,
    #     label: "Faz tratamento com insulina ao domicilio?",
    #     type: "choice",
    #     options: [{option: "Sim", next: 4}, {option: "Não", next: 7}]
    # }, {
    #     componentId: 4,
    #     label: "Regime de dieta oral?",
    #     type: "choice",
    #     options: [{option: "Sim", next: 6}, {option: "Não", next: 5}]
    # }, {
    #     componentId: 5,
    #     label: "Suspender tratamento",
    #     type: "action",
    #     next: 7
    # }, {
    #     componentId: 6,
    #     label: "Se possivel, manter o tratamento e dieta oral",
    #     type: "action",
    #     next: 7
    # }, {
    #     componentId: 7,
    #     label: "Calcular o tratamento adequado",
    #     type: "action",
    #     next: 8
    # }, {
    #     componentId: 8,
    #     label: "Já tem um tratamento registado no sistema?",
    #     type: "choice",
    #     options: [{option: "Sim", next: 9}, {option: "Não", next: 10}]
    # }, {
    #     componentId: 9,
    #     label: "Verificar medições em jejum",
    #     type: "action",
    #     next: 15
    # }, {
    #     componentId: 10,
    #     label: "Valores glicémia maiores que 180?",
    #     type: "choice",
    #     options: [{option: "Sim", next: 12}, {option: "Não", next: 11}]
    # }, {
    #     componentId: 11,
    #     label: "Não é necessário qualquer ajuste. Manter o regime de medicações",
    #     type: "action",
    #     next: null
    # }, {
    #     componentId: 12,
    #     label: "Valores de glicémia maiores que 250?",
    #     type: "choice",
    #     options: [{option: "Sim", next: 13}, {option: "Não", next: 14}]
    # }, {
    #     componentId: 13,
    #     label: "Administrar 10U de insulina basal mais suplemento de insulina Prandial",
    #     type: "action",
    #     next: null
    # }, {
    #     componentId: 14,
    #     label: "Administrar 0.1U por Kg de insulina basal mais suplemento de insulina Prandial",
    #     type: "action",
    #     next: null
    # }, {
    #     componentId: 15,
    #     label: "Valores glicémia maiores que 180?",
    #     type: "choice",
    #     options: [{option: "Sim", next: 17}, {option: "Não", next: 16}]
    # }, {
    #     componentId: 16,
    #     label: "Verificar medições após as refeições",
    #     type: "action",
    #     next: 18
    # }, {
    #     componentId: 17,
    #     label: "Aumentar a quantidade de insulina Basal em 10%",
    #     type: "action",
    #     next: null
    # }, {
    #     componentId: 18,
    #     label: "Valores glicémia maiores que 180?",
    #     type: "choice",
    #     options: [{option: "Sim", next: 19}, {option: "Não", next: 20}]
    # }, {
    #     componentId: 19,
    #     label: "Adicionar mais 4 unidade de insulina prandial",
    #     type: "action",
    #     next: null
    # }, {
    #     componentId: 20,
    #     label: "Manter tratamento",
    #     type: "action",
    #     next: null
    # }