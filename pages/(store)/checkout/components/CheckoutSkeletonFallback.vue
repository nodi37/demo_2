<template>
  <div class="h-full max-w-7xl lg:pl-4 xl:px-4 mx-auto lg:flex overflow-hidden">
    <div class="flex flex-col gap-10 flex-1 p-4 sm:p-8 md:p-12 lg:pl-0">
      <USkeleton v-for="i in 3" class="h-32 w-full" />
    </div>
    <div class="flex-1">
      <USkeleton class="h-full w-full" />
    </div>
  </div>
</template>
