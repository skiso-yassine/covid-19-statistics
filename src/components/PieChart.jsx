import React, { Component } from 'react';
import { Pie } from 'react-chartjs-2';
import { Link } from 'react-router-dom';

class PieChart extends Component {

    constructor(props){
        super(props);

        this.state = {
            date:new Date(),
            data:{
                labels:['Cases','Deaths','Recovered','Active'],
                datasets:[
                    {
                        data:[20,50,80,90],
                        backgroundColor:['#3393FF','#F62023','#5BF349','#10F4DC'],
                    }
                ],
            },
            options: {
                legend: {
                    display: true,
                    position:'bottom'
                    }
                }
        };

        this.handleSearch = this.handleSearch.bind(this);
       
    }

    componentDidMount() {
        this.getAll();
        this.getAllCountries();
        
        
    }
    
    //get Home data
    getAll = () =>{
        fetch('https://disease.sh/v3/covid-19/all')
        .then(res => {
            res.json().then(res => {
                this.setState({
                    dataRow:[
                        {'name':'Cases','value':res.cases},
                        {'name':'Today Cases','value':res.todayCases},
                        {'name':'Deaths','value':res.deaths},
                        {'name':'Today Deaths','value':res.todayDeaths},
                        {'name':'Recovered','value':res.recovered},
                        {'name':'Today Recovered','value':res.todayRecovered},
                        {'name':'Active','value':res.active},
                        {'name':'Critical','value':res.critical}
                    ],
                    data:{
                        datasets:[
                            {
                                data:[res.cases,res.deaths,res.recovered,res.active]
                            }
                        ]
                    },
                    
                });
            })
        })
        .catch(err => {
            console.log(err)
        })
    }

    //create row
    dataRow = () =>{
        if(this.state.dataRow){
               return this.state.dataRow.map( (row,i) =>{
                return  ( 
                        <tr key={i} >
                            <td><span>{row.name}</span>  </td>
                            <td> {row.value} </td>
                        </tr>
                )
            })
        }

    }

    //get data with spesific countrie 
    getDataWithCountrie = (countrie) =>{
        fetch('https://disease.sh/v3/covid-19/countries/'+countrie)
        .then(res => {
            console.log(res)
        })
        .catch(err => {
            console.log(err)
        })
    }

    //get data with all countries
    getAllCountries = () =>{
        fetch('https://disease.sh/v3/covid-19/countries')
        .then(res => {
            res.json().then(res => {
                this.setState({
                    allCountries:res
                })
            })
        })
        .catch(err => {
            console.log(err)
        })
    }

    listAllCountries = () =>{
        if (this.state.allCountries) {
            return this.state.allCountries.map((countrie,i) =>{
                if(this.state.input){
                    if(countrie.country.toLowerCase().match(this.state.input.toLowerCase())){
                        return ( 
                            
                                <tr style={{height: '80px'}} key={i} >
                                   <td><Link to={{
                                                pathname: countrie.country+'/detailles',
                                                cnt:countrie
                                            }}  ><img src={countrie.countryInfo.flag} alt='...' /></Link></td>
                                    <td><Link to={{
                                                pathname: countrie.country+'/detailles',
                                                cnt:countrie
                                            }}  >{countrie.country}</Link></td>
                                    
                                    
                                </tr>
                        )
                    }
                    // if (countrie.country.toLowerCase().indexOf(this.state.input.toLowerCase()) > -1) {
                    //     return (
                    //                 <tr style={{height: '80px',display:''}} key={i}>
                    //                     <td><img src={countrie.countryInfo.flag} /></td>
                    //                     <td> {countrie.country} </td>
                    //                 </tr>
                    //             )
                    // }else{
                    //     return (
                    //         <tr style={{height: '80px',display:'none'}} key={i}>
                    //             <td><img src={countrie.countryInfo.flag} /></td>
                    //             <td> {countrie.country} </td>
                    //         </tr>
                    //     )
                    // }
                }else{
                        return (
                            
                                <tr style={{height: '80px'}} key={i}>
                                    <td><Link to={{
                                                pathname: countrie.country+'/detailles',
                                                cnt:countrie
                                            }}  ><img src={countrie.countryInfo.flag} alt='...'/></Link></td>
                                    <td><Link 
                                            to={{
                                                pathname: countrie.country+'/detailles',
                                                cnt:countrie
                                            }} >{countrie.country}</Link></td>
                            </tr>
                            
                            
                        )
                }
            })
        }
    }

    handleSearch = (event) =>{
        this.setState({
            input:event.target.value.toUpperCase()
        })
        
    }

    render() {
        
        var h6 = <h6 className="text-center"> Last update:</h6>;
        if(this.state.date != null){
            const day = this.state.date.getDate();
            const month = this.state.date.getMonth();
            var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            const year = this.state.date.getFullYear();
            const hours = this.state.date.getHours();
            const minites = this.state.date.getMinutes();
            h6 = <h6 className="text-center"> Last update: {months[month]+", "+day+", "+year+", "+hours+":"+minites+" GMT"} </h6>;
        }else{
            h6 = <h6 className="text-center"> Last update: No Date!! </h6>
        }
       
        return (
            <div className="container">
                <h3 className="mb-3 mt-3 text-center">COVID-19 CORONAVIRUS PANDEMIC</h3>
                {h6}
                <Pie data={this.state.data} options={this.state.options} />
                <div className="row">
                    <div className="col-sm column ">
                        <table>
                            <tbody>
                                {this.dataRow()}
                            </tbody>
                        </table>
                    </div>

                    <div className="col-sm column table-responsive" >
                        <div className="input-group">
                            <div className="input-group-prepend ">
                                <span className="input-group-text" >
                                    <i className="fa fa-search"></i>
                                </span>
                            </div>
                            <input type="text" className="form-control input " placeholder="Countrie" onChange={this.handleSearch}/>
                        </div>
                        <table className="mt-3 ">
                            <tbody>
                                {this.listAllCountries()}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}
export default PieChart;