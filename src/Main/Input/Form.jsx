import React, { useState } from 'react';
import './FormStyle.css';
import axios from 'axios';

export default function Form({setshowingdata}) {
    const url = 'https://monkfish-app-iwk8n.ondigitalocean.app/api/calculate';
    const [mainSelector, setMainSelector] = useState('');
    // const [additionalSelector, setAdditionalSelector] = useState('');
    const [data, setData] = useState({
        firstScore: null,
        secondScore: null,
        sector: '',
        specialitygroup: '',
        undergroup: ''
    });
    const additionalSelector = data.specialitygroup === '1' ? '1' :data.specialitygroup==='3' ? '3':'';
    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({
            ...prev,
            [name]:value
        }));
    };
    

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        try {
            // console.log(data);
            const {data:d} = await axios.post(url,data);
            // console.log(d.data);
            setshowingdata(d.data);
            // Add your form submission logic here
        } catch (error) {
            console.log(error);
        }
    };

    // const handleMainSelectorChange = (event) => {
    //     const value = event.target.value;
    //     setMainSelector(value);

    //     if (value === '1') {
    //         setAdditionalSelector('additional1');
    //     } else if (value === '3') {
    //         setAdditionalSelector('additional2');
    //     } else {
    //         setAdditionalSelector('');
    //     }
    // };

    return (
        <div>
            <form onSubmit={handleOnSubmit}>
                <p>Bölmə</p>
                <select name="sector" id="Bölmə" value={data.sector} onChange={handleOnChange}>
                <option >Bolme sec</option>
                    <option value="Az">Azərbaycan</option>
                    <option value="Rus">Rus</option>
                    <option value="Eng">İngilis</option>
                    <option value="Türk">Türk</option>
                </select>

                <p>İxtisas qrupu</p>
                <select name="specialitygroup" id="Qrup" value={data.specialitygroup} onChange={handleOnChange}>
                    <option >Qrup sec</option>
                    <option value="1">1-ci qrup</option>
                    <option value="2">2-ci qrup</option>
                    <option value="3">3-cü qrup</option>
                    <option value="4">4-cü qrup</option>
                    <option value="5">5-ci qrup</option>
                </select>

                {additionalSelector && (
                    <select name="undergroup" value={data.undergroup} onChange={handleOnChange}>
                        {additionalSelector === '1' ? (
                            <>
                            <option >Alt qrup sec</option>
                                <option value="RK">RK</option>
                                <option value="RI">RI</option>
                            </>
                        ) : additionalSelector === '3' ? (
                            <>
                            <option >Alt qrup sec</option>
                                <option value="DT">DT</option>
                                <option value="TC">TC</option>
                            </>
                        ) : <></>}
                    </select>
                )}

                <p>Ballarınız</p>
                <input type='text' id="numericInput1" name="firstScore" value={data.firstScore} onChange={handleOnChange} placeholder='Buraxılış imtahanı:'></input>
                <input type='text' id="numericInput2" name="secondScore" value={data.secondScore} onChange={handleOnChange} placeholder='Qəbul imtahanı:'></input>

                <button type="submit">Hesabla</button>
            </form>
        </div>
    );
}
