import { useColorMode } from '#imports';

export const settingsStore = defineStore('settings', {
  state: (): SettingsType => {
    const theme = useColorMode();
    return {
      theme: (theme.preference as SettingsType['theme']) || 'system',
      lang: 'en',
    };
  },
  actions: {
    setTheme(theme: SettingsType['theme']) {
      this.theme = theme;
      useColorMode().preference = theme;
    },
    setLang(lang: SettingsType['lang']) {
      this.lang = lang;
    },
  },
  persist: true,
});

class SettingsType {
  theme!: 'light' | 'dark' | 'system';
  lang!: 'de' | 'en';
}
