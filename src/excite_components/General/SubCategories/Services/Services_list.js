import React , {  Component }from 'react';
import axios from 'axios'
//import { Link, withRouter } from 'react-router-dom';
 
import {
    Form,
    Select,
    Input,
    Button, 
  } from "antd";

  import ExciteNav from '../../sections/nav'

  import Nav from '../../../containers/nav'

import Query_Results from '../../Queried_Results'

import Uploaded_Post from '../../Items'

 
const Search = Input.Search;
const { Option } = Select;



const host = 'https://backend-entr.herokuapp.com';
const slug = 'services'

const Brands = ['LG','Samsung','Sony', 'Hi-Sense']

class Services_Item extends Component{
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
      const endpoint = host + `/retail/item-category-list/`
      await axios.get(endpoint,{
          params:{
              slug
          }
      } )
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
        const payment_type = 
            values["payment_type"] === undefined ? null : values["payment_type"] ;
        
        const transportation_mode = 
            values['transportation_mode'] === undefined ? null : values['transportation_mode'] ;
        
        const service_type = 
            values['service_type'] === undefined ? null : values['service_type'] ;
        const price = 
            values['price'] === undefined ? null : values['price'] ;
        const location = 
          values['Location'] === undefined ? null : values['Location'] ;
  
       
        if(!err){
            const endpoint_value ='search_services'
            const Query_Url = host + `/retail/${endpoint_value}/`
            
            axios.get(Query_Url,{params:{
                title,transportation_mode,
                payment_type,service_type ,
                price,location
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
        <ExciteNav/>

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
                      <Select placeholder ="Service Type">
                      <Option value="">None</Option>
                         <Option value="Insurance">Insurance</Option>
                         <Option value="Pharmacy">Pharmacy</Option>
                      </Select>
                </Form.Item>

                <Form.Item name ="payment_type">
                      <Select placeholder ="Payment Type">
                         <Option value="">None</Option>
                         <Option value="POS">POS</Option>
                         <Option value="POS">Credit Card</Option>
                         <Option value="POS">Wire Transfer</Option>
                      </Select>
                </Form.Item>
                
                

                <Form.Item name = "Location">
                      <Select placeholder ="Select a location">
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

export default Services_Item;