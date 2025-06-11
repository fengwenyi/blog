# 成功上架！我的iOS App发布到App Store Connect的心路历程

记录从零发布iOS App到App Store Connect的全过程，包括证书申请、设备注册、Xcode打包及提交审核的实战经验，分享避坑技巧和过审心得，助力开发者高效上架。

## 注册Apple开发者账号

访问 [Apple Developer](https://developer.apple.com/account)（年费$99）

## 申请证书

### 创建App ID（Identifiers）

这一步是注册应用，注册完以后，下载并保存，下一步要使用。

在Certificates, Identifiers & Profiles页面

选择"App IDs" → "+"按钮

重要：确保Bundle ID与Xcode项目完全一致

建议开启所需能力（如Push Notifications）

### Certificate

这是申请证书，你需要申请 `开发证书` 和 `分发证书` 。

注册证书，需要上一步，注册的 Identifiers 文件。

注册完证书，你需要下载，然后安装，你就可以在钥匙串应用，`我的证书` 看到。

开发证书（Development） ，用于真机调试，有效期1年，需定期更新

分发证书（Distribution） ，类型选择"App Store"，重要：私钥需妥善备份（.p12文件）

#### Mac App

Mac Development: 开发

Mac App Distribution：签名

Mac Installer Distribution：上传到App Store

#### iOS App

iOS App Development：开发证书

iOS Distribution (App Store Connect and Ad Hoc)：分发证书

### Devices

这一步是注册开发的设备

Mac App,就注册Mac 设备

iOS App，就注册iPhone

需要UDID（可通过Xcode或第三方工具获取）


### Profiles

配置文件

开发配置：关联开发证书+设备

发布配置：关联分发证书

建议命名规范：AppName_ProfileType_Date


## Mac App

略。

## iOS App 提交审核

打包

在 Xcode 中选择 Generic iOS Device，然后选择 Product -> Archive

打包完成后，选择 Distribute App，并选择 App Store Connect。

然后在 Apple Developer 网站上，创建应用，并填写信息。

填写完成后，就可以提交审核了。

## TestFlight 测试

提审前，你可以使用 TestFlight，进行真机测试。