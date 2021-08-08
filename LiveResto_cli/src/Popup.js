import React,{Component} from 'react'
import { View, Text,Dimensions,TouchableWithoutFeedback,StyleSheet,Modal,FlatList } from 'react-native'



const deviceHeight = Dimensions.get('window').height
export default class Popup extends Component {
    constructor(props){
        super(props);
        this.state={
            show:false
        }
    }

    show = () =>{
        this.setState({show:true})
    }

    close=()=>{
        this.setState({show:false})
    }

    renderOutsideTouchable(onTouch){
        const view = <View style={{flex:1,width:'100%'}} />
        if (!onTouch) return view

        return(
            <TouchableWithoutFeedback onPress={onTouch} style={{flex:1,width:'100%'}}>
                {view}
            </TouchableWithoutFeedback>
        )
        
    }
    renderTitle=()=>{
        const {title} = this.props;
        return(
        <View>
            <Text style={{
                color:'#182e44',
                fontSize:18,
                fontWeight:"500",
                margin:15
            }}>
                {title}
            </Text>
        </View>)
    }

    renderContent =()=>{
        const {data} = this.props
        return(
            <View>
                <FlatList
                    style={{marginBottom:20}}
                    showsVerticalScrollIndicator={false}
                    data={data}
                    renderItem={this.renderItem}
                    extraData={data}
                    keyExtractor={(item,index)=>index.toString()}
                    ItemSeparatorComponent={this.renderSeparator}
                    contentContainerStyle={{
                        paddingBottom:40
                    }}
                />
            </View>
        )
    }

    renderItem=({item})=>{
        return (
            <View style={{height:50,flex:1,alignItems:'center'}}>
                <Text style={{fontSize:18,fontWeight:'normal',color:'#182E44'}}>{item.name}</Text>
            </View>
        )
    }
 
    renderSeparator=()=>(
        <View
            style={{
                opacity:0.1,
                backgroundColor:'#1234ee',
                height:1
            }}
        >

        </View>
    )
    render() {
        let {show} = this.state;
        const {onTouchOutSide,title} = this.props
        return (
            <Modal
                animationType={'fade'}
                transparent={true}
                visible={show}
                onRequestClose={this.close} 
            >
                <View
                    style={{flex:1,backgroundColor:'#eee',justifyContent:'flex-end'}}
                >
                        {this.renderOutsideTouchable(onTouchOutSide)}
                        <View style={{
                        backgroundColor:'#ffffff',
                        width:'100%',
                        borderTopRightRadius:10,
                        borderTopLeftRadius:10,
                        paddingHorizontal:10,
                        maxHeight:deviceHeight*0.4
                        
                        }}>
                           {this.renderTitle()}
                           {this.renderContent()}
                        </View>
                </View>
            </Modal>

        )
    }
}

