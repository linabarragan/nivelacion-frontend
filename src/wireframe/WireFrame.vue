<template>
  <v-app>
    <!-- Barra superior -->
    <v-app-bar app flat color="primary" dark>
      <v-app-bar-title>Mi Aplicación</v-app-bar-title>
    </v-app-bar>

    <!-- Contenido principal -->
    <v-main>
      <v-container fluid class="pa-4">
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts"></script>
