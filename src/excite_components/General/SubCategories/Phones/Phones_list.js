import React , {  Component }from 'react';
import axios from 'axios'
//import { Link, withRouter } from 'react-router-dom';
 
import {
    Form,
    Select,
    Input,
    Button, 
  } from "antd";

  import Nav from '../../../containers/nav'

import Query_Results from '../../Queried_Results'

import Uploaded_Post from '../../Items'

 
const Search = Input.Search;
const { Option } = Select;



const host = 'https://backend-ent.herokuapp.com';
const slug = 'phones'

const Brands = ['LG','Samsung','Sony', 'Hi-Sense']
const Year_Made = ['2020','2019','2017','2016','2015']

class Phones_Item extends Component{
    state = {
        items : [],
        loading : true,
        error:null,

        search_results :[],
        loading_query : false,


        show_results : true,
        categories : [],

    }

    

    Get_Items = async()=>{
        const endpoint = host + `/retail/phones_list/`
        await axios.get(endpoint)
        .then(res=>{
            this.setState({
                items: res.data,
                loading: false,
            })
            console.log('items', res.data)
        })
    }

    Search_Query = (values,err) =>{
       const title =  
            values["title"] === undefined ? null : values["title"] ;
        
        const color = 
            values['color'] === undefined ? null : values['color'] ;
        const size = 
            values['size'] === undefined ? null : values['size'] ;
        const brand = 
            values['brand'] === undefined ? null : values['brand'] ;
        const condition = 
            values['condition'] === undefined ? null : values['condition'] ;
        const price = 
            values['price'] === undefined ? null : values['price'] ;
        const location = 
          values['Location'] === undefined ? null : values['Location'] ;
        
       
        if(!err){
            const endpoint_value ='search_phones'
            const Query_Url = host + `/retail/${endpoint_value}/`
            
            axios.get(Query_Url,{params:{
                title,
                    color,size
                ,brand,condition,price,location
            }})
            .then(res=>{
                this.setState({
                    search_results: res.data,
                    show_results: false,
                })
                console.log('search result', res.data)
            })
            .catch(e=>{
                console.log(e)
            })
        }
          //search query contents ends here
      };

      componentDidMount(){
        this.Get_Items()
      }

    render(){
        const {items,categories,  loading ,search_results , show_results, error } = this.state
        const query_results = search_results
        return(
            <>
    <Nav/>
<div
    style={{paddingTop:50}}
    className="container mx-auto ">
            <div className="grid grid-cols-8 gap-4  mx-auto">
        
  
          <div className="col-span-8  sm:col-span-8  md:col-span-8 lg:col-span-2 xl:col-span-2">
                <Form  onFinish={this.Search_Query}>
                  <Form.Item>
                  
                </Form.Item>
                <Form.Item name ="title">
                  
                <Search placeholder=" Title " />
                    
                </Form.Item>

                <Form.Item name ="electronic_category">
                      <Select placeholder ="Electronic Category">
                      <Option value="">None</Option>
                         <Option value="Lagos">Audio</Option>
                      </Select>
                </Form.Item>

                <Form.Item name ="electronic_type">
                      <Select placeholder ="Electronic Type">
                         <Option value="">None</Option>
                         <Option value="Lagos">Audio</Option>
                      </Select>
                </Form.Item>
                
                <Form.Item name ="brand">
                      <Select placeholder ="Brand">
                        {
                            Brands.map((b)=>(
                                <>
                                <Option value={b}>{b}</Option>
                                </>
                            ))
                        }
                      </Select>
                </Form.Item>

                <Form.Item name = "Location">
                      <Select placeholder ="Select State">
                      <Option value=""></Option>
                      <Option value="Lagos">Lagos</Option>
                      <Option value="Calabar">Calabar</Option>
                      <Option value="Uyo">Uyo</Option>
                      </Select>
                </Form.Item>
           
               
                  <Form.Item >
                  
                  <div>
                
                  <Form.Item name = "Price_Range" style={{ marginBottom: 0 }}>
                        <Form.Item
                        name="year"
                        
                        style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
                        >
                        <Input placeholder="Starting Price" />
                        </Form.Item>
                        <Form.Item
                        name="month"
                        
                        style={{ display: 'inline-block', width: 'calc(50% - 8px)', margin: '0 8px' }}
                        >
                        <Input placeholder="Closing Price" />
                        </Form.Item>
                    </Form.Item>

              </div>

                  </Form.Item>

                  <Form.Item >
                    <button className="login-button" type="primary" htmlType="submit">
                      Filter
                    </button>
                  </Form.Item>
                </Form>
          
                  

          </div>
                  
          <div className=" mx-3 col-span-8  sm:col-span-8
                md:col-span-8 lg:col-span-6 xl:col-span-6 gap-3">
                  {
                  show_results ?(
                    <Uploaded_Post slug_class={slug}  Items={items}/>
                  ):(
                   <Query_Results  slug_class={slug} Results={search_results}/>
                  )
                }
 
              </div>
            </div>
        </div>



            </>
        )
    }


}

export default Phones_Item;