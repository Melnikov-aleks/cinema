import Vue from 'vue';
import lang from 'element-ui/lib/locale/lang/en';
import locale from 'element-ui/lib/locale';
import 'element-ui/packages/theme-chalk/lib/index.css';
import { Button, DatePicker, Carousel, CarouselItem, Image } from 'element-ui';

const elements = [Button, DatePicker, Carousel, CarouselItem, Image];

locale.use(lang);

elements.forEach(el => Vue.use(el, { locale }));
