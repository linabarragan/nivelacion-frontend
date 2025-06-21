<template>
  <v-app>
    <!-- Barra superior centrada -->
    <v-app-bar app flat color="#BCAAA4" dark>
      <div class="d-flex justify-center w-100">
        <v-app-bar-title class="text-center">Mi Aplicación</v-app-bar-title>
      </div>
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
