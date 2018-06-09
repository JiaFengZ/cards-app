## 安装依赖和启动项目
* yarn install
* yarn start
* 本项目在 Android 模拟器上可成功测试运行

## app 页面视图设计
* 卡片集列表：显示所有卡片集
* 卡片详情：显示卡片集详情，有开始测试/添加卡片/删除卡片集按钮
* 测试页面：显示当前测试问题卡片，可翻转卡片查看答案，测试完毕显示答题分数和返回/重新测试按钮
* 添加卡片页面
* 添加卡片集页面
* 我的计划页面：采用一个日历显示制定的学习计划，可添加和删除学习计划。会根据制定的计划日期（当天的8：00）发送本地通知提醒学习，如果没有制定任何计划，会发送提醒制定学习计划的通知。

## 技术组合方案
* 使用 `react-redux`进行状态管理，管理卡片集`deck` 学习计划`plan`  本地通知`notificationList`的 store 状态，分别具有增删查的 action
* 使用 `AsyncStorage` 管理保存数据，存放三类数据： decks/plans/notifications
* 使用 `react-navigation` 进行 app 视图导航管理
* 使用 `expo`

## 构建开发环境的记录
* 由于 npm 5 以上的版本构建 create-react-native-app 会存在问题，因此使用yarn进行包管理
* yarn add create-react-native-app global
* 下载安装 genymotion
* genymotion 配置 adb 路径，添加至环境变量，cmd 执行：adb ，命令有效则配置成功
* genymotion 创建 Android 模拟器
* 执行：create-react-native-app，创建 react-native 项目
* 由于我安装的 genymotion 可选创建的SDK版本最高为 26.0.0，因此修改packjson中的依赖版本如下：expo@25.0.0/react@16.3.0/react-native@0.54.0，同时修改app.json中SDK版本为 26.0.0
* 启动 genymotion 安卓模拟器
* 执行：yarn start 启动项目
* 根据提示按下 a 键连接模拟器，连接成功后，会在模拟器中安装启动 expo，打包运行应用。到此就可以编写代码调试开发了。

注意：
* 如果存在adb端口占用导致连接模拟器失败，先检查是否配置好了 adb.exe 的系统环境变量
* 如果配置好环境变量后，还是存在端口占用问题，可以在系统变量中新建 ANDROID_ADB_SERVER_PORT，使用一个不被占用的端口号
* 如果成功连接后在模拟器中启动 expo 时提示出错，可检查 expo 的 log 日志查看详细错误信息，我在构建的过程中就出现error，点击log发现是 expo 的 SDK 版本不正确，这时候就要根据需要调整 packjson.json和app.json中的配置，重新执行yarn install ；yarn start 构建项目
* [关于 expo/react/react-native/SDK 的版本约束](https://github.com/react-community/create-react-native-app/blob/master/VERSIONS.md)


