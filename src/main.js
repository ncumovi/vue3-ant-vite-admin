import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";

import "./permission";

import {
  Layout,
  Dropdown,
  Menu,
  Calendar,
  Tabs,
  Table,
  Button,
  Form,
  Input,
  InputPassword,
  Select,
  Upload,
  ConfigProvider,
  Breadcrumb,
  Rate,
  Checkbox,
  List,
  Comment,
  Avatar,
  Cascader,
  Alert,
  Divider,
  Row,
  Col,
  DatePicker,
  Popover,
  Badge,
  Progress,
  Empty,
  Modal,
} from "ant-design-vue";
import "ant-design-vue/dist/antd.less";
import * as icons from "@ant-design/icons-vue";

const app = createApp(App);

for (const i in icons) {
  app.component(i, icons[i]);
}

app.use(Layout);
app.use(Dropdown);
app.use(Menu);
app.use(Calendar);
app.use(Tabs);
app.use(Table);
app.use(Button);
app.use(Form);
app.use(Input);
app.use(InputPassword);
app.use(Select);
app.use(Upload);
app.use(ConfigProvider);
app.use(Breadcrumb);
app.use(Rate);
app.use(Checkbox);
app.use(List);
app.use(Comment);
app.use(Avatar);
app.use(Cascader);
app.use(Alert);
app.use(Divider);
app.use(Row);
app.use(Col);
app.use(DatePicker);
app.use(Popover);
app.use(Badge);
app.use(Progress);
app.use(Empty);
app.use(Modal);

app.use(router);

app.use(createPinia());

app.mount("#app");
