'use strict'

import {StyleSheet} from "react-native"

export const theme = {
    dark:{
        header:{
            backgroundColor:"#444",
            borderBottomColor:"#000"
        },
        navigationBarTitleText:{
            color:"#FFF"
        },
        navigationBarButtonText:{
            color:"#FFF"
        },
        searchBar:{
            backgroundColor:"#444",
            borderBottomColor:"#000"
        },
        searchBarButtonText:{
            color:"#FFF"
        },
        tabBar:{
            borderTopColor:"#000",
            backgroundColor:"#444"
        },
        tabBarItemText:{
            color:"#FFF"
        },
        tabBarSelectedItemText:{
            color:"dodgerblue"
        },
        topicCell:{
           backgroundColor:"#333"
        },
        topicMintitleText:{
            color:"#999"
        },
        topicSubtitleText:{
            color:"#999"
        },
        cellSeparator:{
          backgroundColor:"#000"  
        },
        topicTag:{
          backgroundColor:"#555"  
        },
        topicTagText:{
            color:"#999"
        },
        tab:{
          borderBottomColor:"#000"  
        },
        selectedTab:{
            color:"#FFF"
        },
        publishArea:{
          borderTopColor:"#555"  
        },
        publishTextArea:{
          color:"#FFF"
        },
        publishRow:{
          borderBottomColor:"#000"  
        },
        publishLabel:{
            color:"#FFF"
        },
        topicComments:{
            borderTopColor:"#000"  
        },
        topicComment:{
            borderBottomColor:"#000"
        },
        uncollectIcon:{
          color:"#999"  
        },
        collectIcon:{
          color:"#FF3300"  
        },
        container:{
            backgroundColor:"#333"
        },
        disagreeIcon:{
            color:"#AAA"
        },
        agreeIcon:{
            color:"dodgerblue"
        }
    },
    light:{
        tabBarItemText:{
            color:"#333"
        },
        tabBarSelectedItemText:{
            color:"blue"
        },
        uncollectIcon:{
          color:"#999"  
        },
        collectIcon:{
          color:"#333"  
        },
        disagreeIcon:{
            color:"#AAA"
        },
        agreeIcon:{
            color:"#333"
        }
    }
}

export default function preferredThemeByName(themeName) {
    if(!themeName){
        return {}
    }
    return StyleSheet.create(theme[themeName])
}