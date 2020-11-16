import React from 'react';
import { useParams } from 'react-router-dom';

const CountryDetaille = (props) => {
        
        var date = new Date();
    
        let { country } = useParams();
        
            const day = date.getDate();
            const month = date.getMonth();
            var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            const year = date.getFullYear();
            const hours = date.getHours();
            const minites = date.getMinutes();


        return (
            <div className="container text-center">
                <h3 className="mt-5 text-center">{country} Detailles</h3>
                <h6 className="text-center"> Last update: {months[month]+", "+day+", "+year+", "+hours+":"+minites+" GMT"} </h6>
                <div className="card columnDet" style={{marginLeft: '20%',marginRight: '20%'}}>
                    <div className="row" style={{padding: '15px'}}>
                        <div className="col-4">
                            <img src={props.location.cnt.countryInfo.flag} className="card-img-top" alt="..."/>
                        </div>
                        <div className="col-8">
                            <table className="tableDet">
                                <tbody>
                                    <tr>
                                        <td><span>Continent :</span></td>
                                        <td>{props.location.cnt.continent}</td>
                                    </tr>
                                    <tr>
                                        <td> <span>Country</span> : </td>
                                        <td> {props.location.cnt.country} </td>
                                    </tr>
                                    <tr>
                                        <td><span>Population</span> :</td>
                                        <td> {props.location.cnt.population} </td>
                                    </tr>
                                </tbody>
                            </table>
                            
                        </div>
                    </div>
                    
                    <div className="card-body">
                        <table>
                            <tbody>
                                
                                <tr>
                                    <td><span>Cases</span> :</td>
                                    <td> {props.location.cnt.cases} </td>
                                    <td><span>Today Cases :</span></td>
                                    <td> {props.location.cnt.todayCases} </td>
                                </tr>
                                <tr>
                                    <td><span>Deaths :</span></td>
                                    <td> {props.location.cnt.deaths} </td>
                                    <td><span>Today Deaths :</span></td>
                                    <td> {props.location.cnt.todayDeaths} </td>
                                </tr>
                                <tr>
                                    <td><span>Recovered :</span></td>
                                    <td> {props.location.cnt.recovered} </td>
                                    <td><span>Today Recovered :</span></td>
                                    <td> {props.location.cnt.todayRecovered} </td>
                                </tr>
                                <tr>
                                    <td><span>Active :</span></td>
                                    <td> {props.location.cnt.active} </td>
                                    <td><span>Critical :</span></td>
                                    <td> {props.location.cnt.critical} </td>
                                </tr>
                                <tr>
                                    <td><span>Cases Per One Million :</span></td>
                                    <td> {props.location.cnt.casesPerOneMillion} </td>
                                    <td><span>Deaths Per One Million :</span></td>
                                    <td> {props.location.cnt.deathsPerOneMillion} </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
}
export default CountryDetaille;