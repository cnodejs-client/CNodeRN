'use strict'

import React,{Component,View,StyleSheet,Text,ListView,Image,Alert} from "react-native"
import ScrollableTabView from "react-native-scrollable-tab-view"

import containerByComponent from "../lib/redux-helper"
import {messageReducer} from "./reducer"
import {fetchMessages,fetchMessageCount,markAllMessage} from "./action"
import Tabs from "../common/component/tabs"
import Loading from "../common/component/loading"
import Anonymous from "../common/module/anonymous"
import NavBar from "../common/component/navbar"

import styles from "./stylesheet/message"
import preferredThemeByName from "../common/stylesheet/theme"

class Message extends Component{
    constructor(props){
        super(props)
        this.state = {
            unreadDataSource:new ListView.DataSource({
                rowHasChanged:(r1,r2)=> r1 !== r2
            }),
            readDataSource:new ListView.DataSource({
                rowHasChanged:(r1,r2)=> r1 !== r2
            }),
            isLogined:false
        }
        this._preferredTheme = preferredThemeByName(props.userPrefs["preferredTheme"])
    }
    componentDidMount(){
        global.storage.getItem("user").then((user)=>{
            if(user){
                this.setState({isLogined:true})
                this.props.actions.fetchMessages(user.accessToken)
            }
        })
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.messagesFetched && !nextProps.messagesFetching){
            this.setState({
                unreadDataSource:this.state.unreadDataSource.cloneWithRows(nextProps.messages.hasnot_read_messages),
                readDataSource:this.state.readDataSource.cloneWithRows(nextProps.messages.has_read_messages)
            })
        }
        if(nextProps.userPrefs && nextProps.userPrefs !== this.props.userPrefs){
            this._preferredTheme = preferredThemeByName(nextProps.userPrefs["preferredTheme"])
        }
    }
    _renderMessage(message){
        return (
            <View style={[styles.listCell,this._preferredTheme["topicCell"]]}>
                <View style={styles.cellRow}>
                    <Image source={{uri:message.author.avatar_url}} style={styles.cellImage}/>
                    <View style={styles.cellSubtitle}>
                        <Text style={[styles.cellSubtitleText,this._preferredTheme["topicSubTitleText"]]}>{message.author.loginname}</Text>
                        <Text style={styles.cellMintitleText}>{message.reply.create_at}</Text>
                    </View>
                    <View style={styles.cellAccessory}><Text style={styles.cellAccessoryText}>回复</Text></View>
                </View>
                <View style={styles.cellTitle}>
                    <Text style={[styles.cellSubtitleText,this._preferredTheme["topicSubTitleText"]]}>评论了<Text style={styles.repliedTopicTitle}>{message.topic.title}</Text></Text>
                </View>
                <View style={styles.cellTitle}>
                    <Text style={[styles.cellSubtitleText,styles.replyContent,this._preferredTheme["topicSubTitleText"]]}>{message.reply.content.replace(/\s/g,"")}</Text>
                </View>
            </View>
        )
    }
    _renderTimeline(){
        const renderTabBar = ()=>{
            return (
                <Tabs style={[styles.tab,this._preferredTheme["tab"]]} 
                selectedStyle={[styles.selectedTab,this._preferredTheme["selectedTab"]]}>
                    <Text style={styles.unselectedTab}>未读</Text>
                    <Text style={styles.unselectedTab}>已读</Text>
                </Tabs>
            )
        }
        return (
            <ScrollableTabView renderTabBar={renderTabBar}>
                <ListView dataSource={this.state.unreadDataSource} renderRow={this._renderMessage.bind(this)} 
                enableEmptySections={true} initialListSize={6}/>
                <ListView dataSource={this.state.readDataSource} renderRow={this._renderMessage.bind(this)} 
                enableEmptySections={true} initialListSize={6}/>
            </ScrollableTabView>
        )
    }
    render(){
        const loadingColor = this._preferredThemeDefines && this._preferredThemeDefines["loading"]?this._preferredThemeDefines["loading"].color:"#333"
        return (
            <View style={[styles.container,this._preferredTheme["container"]]}>
            <NavBar title="消息" leftButton={false} userPrefs={this.props.userPrefs}/>
            {!this.state.isLogined?<Anonymous />:this.props.messagesFetching?<Loading color={loadingColor}/>:this._renderTimeline()}
            </View>
        )
    }
}

export default containerByComponent(Message,messageReducer,{fetchMessages,fetchMessageCount,markAllMessage})