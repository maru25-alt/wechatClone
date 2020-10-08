import VueI18n from 'vue-i18n';
import Vue from 'vue';

Vue.use(VueI18n);

const messages = { 
    'en': {
        title: "WeChat Clone",
        Home: "Home",
        Contacts: "Contacts",
        Files: "Files",
        Favourites: "Favourite",
        Settings: "Settings",
        Phone: "Phone", 
        Search: "Search",
        Type: "Type here...",
        profile: "My Profile",
        edit: "Edit Profile",
        wechatId: "Wechat ID",
        Region: "Region",
        Email: "Email",
        message: "message",
        close: "close",
        photo: "Profile Photo",
        upload: "Upload",
        username: "Username",
        firstName: "First Name",
        lastName: "Last Name",
        update: "Update",
        welcomeMsg: "Welcome to Wechat Clone",
        signin: "Sign in",
        signup: "Sign up",
        createAccount: "Create Account",
        signinWithGoogle: "Signin With Google",
        password: "Password",
        rememberMe: "Remember Me",
        confirmPassword: "Confirm Password",
        agreeStmnt: "By clicking Create account, you agree to our Service Terms"

    },
    'cn': {
       title: "微信克隆",
       Home: "家",
       Contacts: "联络人",
       Files: "档案",
       Favourites: "喜爱",
       Settings: "设定值",
       Phone: "电话", 
       Search: "搜索",
       Type: "在此输入...",
       profile: "我的简历",
       edit: "编辑个人资料",
       wechatId: "微信编号",
       Region: "地区",
       Email: "电子邮件",
       message: "信息",
       close: "发送",
       photo: "头像照片",
       upload: "上载",
       username: "用户名",
       firstName: "名字",
       lastName: "姓",
       update: "更新资料",
       welcomeMsg: "欢迎来到微信克隆",
       signin: "登入",
       signup: "注册",
       createAccount: "创建帐号",
        signinWithGoogle: "使用Google登录",
        password: "密码",
        confirmPassword: "确认密码",
        rememberMe: "记得我",
        agreeStmnt: "点击创建帐户，即表示您同意我们的服务条款"

      

    }
};

const i18n = new VueI18n({
    locale: 'en',
    fallbackLocale: 'cn',
    messages});

export default i18n