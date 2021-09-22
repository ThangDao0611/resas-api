import "./App.css";
import axios from "axios";
import { API_KEY } from "./config";
import { CheckBox } from "./CheckBox";
import { useEffect, useState } from "react";
import {Chart} from "./Chart";

const ENDPOINT = "https://opendata.resas-portal.go.jp/api/v1/prefectures";
const ENDPOINTCHART = "https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?cityCode=-&prefCode=";

function App() {
  const [state, setState] = useState([]);
  const [isCheck,setIsCheck] = useState([]);
  const [chart,setChart] = useState([]);

  // get list of city
  useEffect(() => {
    axios
      .get(ENDPOINT, {
        headers: { "X-API-KEY": API_KEY },
      })
      .then((response) => {
        setState(response.data.result);
      }).catch((err) => {
        console.log(err);
      });
  }, []);

  //fecth data for chart

  useEffect(()=>{
    setChart([]);
    isCheck.forEach((check)=>{
      let id ;
      state.forEach((res)=>{
        if(res.prefName === check){
          id = res.prefCode;
        }
      })
      axios.get(ENDPOINTCHART+id,{
        headers: { "X-API-KEY": API_KEY },
      }).then(response=>{
        setChart(c=> [...c,response.data.result.data[0].data]);
      }).catch(error=>{
        console.log(error);
      });
    })
  },[isCheck,state])


  //update chart when checkbox is checked
  const updateCheck = (name)=>{
    if(isCheck.indexOf(name)===-1){
      setIsCheck([...isCheck,name]);
    }
    else{
      let tmp = isCheck.filter(check=>check!==name);
      setIsCheck(tmp);
    }
  }

  return (
    <div className="App">
    <div className="header">日本の都道府県の総人口のチャート</div>
      <div className="CheckBoxContainer">
        {state.length !== 0 &&
          state.map((name) => {
            return <CheckBox name={name.prefName} updateCheck={updateCheck} id={name.prefCode}/>;
          })}
      </div>
      <div className="LineChart">
          <Chart data={chart} name={isCheck}/>
      </div>
    </div>
  );
}

export default App;
