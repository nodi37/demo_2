<script setup lang="ts">
import type { UButton } from "#build/components";

export type CustomRadioProps = {
  name: string;
  label: string;
  icon?: string;
  value?: string;
  help?: string;
  disabled?: boolean;
  actionsPosition?: "top" | "bottom";
  actions?: Array<{
    tooltip?: string;
    button: ExtractPropTypes<typeof UButton> & {
      click?: () => void;
    };
  }>;
};

withDefaults(defineProps<CustomRadioProps>(), { actionsPosition: "bottom" });

const model = defineModel<string>();
</script>
<template>
  <label
    class="flex gap-3 p-4 border-2 rounded-lg cursor-pointer has-[input:checked]:border-primary-500 border-gray-300 has-[input:focus]:ring-1 ring-primary-200 has-[input:disabled]:opacity-60 [&_*]:select-none [&_*]:cursor-pointer"
  >
    <URadio
      class="mt-0.5"
      :name="name"
      :value="value ?? name"
      v-model="model"
      :disabled="disabled"
    />
    <div class="flex-1 flex flex-col">
      <div class="flex gap-2 mb-1 -mt-px">
        <UIcon class="h-6 w-6" v-if="icon" :name="icon" />
        <span class="font-medium text-gray-800 dark:text-gray-200">
          {{ label }}
        </span>
        <div
          class="flex gap-1 ml-auto"
          v-if="actions && actionsPosition == 'top'"
        >
          <UTooltip v-for="{ tooltip, button } in actions" :text="tooltip">
            <UButton v-bind="button" @click="button.click" />
          </UTooltip>
        </div>
      </div>
      <span
        class="text-sm text-gray-500 dark:text-gray-400 whitespace-pre-line"
      >
        {{ help }}
      </span>
      <div
        class="flex self-end mt-1 gap-1"
        v-if="actions && actionsPosition == 'bottom'"
      >
        <UTooltip v-for="action in actions" :text="action.tooltip">
          <UButton v-bind="action.button" />
        </UTooltip>
      </div>
    </div>
  </label>
</template>
