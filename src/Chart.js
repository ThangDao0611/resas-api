import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
} from "recharts";

import { useEffect, useState } from "react";

export const Chart = ({ data, name }) => {
    const [tmp, setTmp] = useState([]);
    const [list,setList] = useState([]);
    //handle data send from app
    useEffect(() => {
        let res = [];
        if (data.length > 0) {
            for (let i = 0; i < data[0].length; i++) {
                let temp = {};
                for (let j = 0; j < data.length; j++) {
                    let pair = { year: data[j][i].year };
                    temp = { ...temp, ...pair };

                    let nameTmp = name[j];
                    let pair2 = { [nameTmp]: data[j][i].value };
                    temp = { ...temp, ...pair2 };
                }

                res.push(temp);
            }
        setTmp(res);
        setList(name);
        }
        //console.log("Tmp and List:",tmp,list);
    }, [data, name]);

    //convert string to color
    let randomColor = (str) => {  
        var hash = 0;
        for (var i = 0; i < str.length; i++) {
            hash = str.charCodeAt(i) + ((hash << 5) - hash);
        }
        var colour = '#';
        for (let i = 0; i < 3; i++) {
            var value = (hash >> (i * 8)) & 0xFF;
            colour += ('00' + value.toString(16)).substr(-2);
        }
        return colour;
    };

    return (
        <ResponsiveContainer height={300}>
            <LineChart
                width={600}
                height={300}
                data={tmp}
                margin={{ top: 5, right: 30, left: 20, bottom: 10 }}
            >
                <CartesianGrid stroke="#ccc" />
                <XAxis dataKey="year" margin={{ bottom: 10 }} />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Legend margin={{ top: 5 }} />
                {list &&
                    list.map((key) => {
                        return (
                            <Line
                                id={key}
                                type="monotone"
                                dataKey={key}
                                stroke={randomColor(key)}
                            />
                        );
                    })}
            </LineChart>
        </ResponsiveContainer>
    );
};
