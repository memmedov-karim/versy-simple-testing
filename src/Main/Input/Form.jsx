import React, { useState } from 'react';
import './FormStyle.css';
import axios from 'axios';

export default function Form({setshowingdata}) {
    const baseUrlL = "http://localhost:5000"
    const baseUrlD = "https://monkfish-app-iwk8n.ondigitalocean.app"
    const url = baseUrlD+"/api/calculate";
    const areas = [
        {
          "_id": "65ce58cd39f0f17ad68fcaa2",
          "name": "Mühəndislik",
          "speciality": "1"
        },
        {
          "_id": "65ce58cd39f0f17ad68fcaa3",
          "name": "Kompüterləşmə",
          "speciality": "1"
        },
        {
          "_id": "65ce58cd39f0f17ad68fcaa4",
          "name": "Nəqliyyat və Logistika",
          "speciality": "1"
        },
        {
          "_id": "65ce58cd39f0f17ad68fcaa5",
          "name": "Biznes və İdarəetmə",
          "speciality": "2"
        },
        {
          "_id": "65ce58cd39f0f17ad68fcaa6",
          "name": "Maliyyə",
          "speciality": "2"
        },
        {
          "_id": "65ce58cd39f0f17ad68fcaa7",
          "name": "Marketinq",
          "speciality": "2"
        },
        {
          "_id": "65ce58cd39f0f17ad68fcaa8",
          "name": "Turizm",
          "speciality": "2"
        },
        {
          "_id": "65ce58cd39f0f17ad68fcaa9",
          "name": "Hüquq",
          "speciality": "3"
        },
        {
          "_id": "65ce58cd39f0f17ad68fcaaa",
          "name": "Dillər",
          "speciality": "3"
        },
        {
          "_id": "65ce58cd39f0f17ad68fcaab",
          "name": "Din və İlahiyyət",
          "speciality": "3"
        },
        {
          "_id": "65ce58cd39f0f17ad68fcaac",
          "name": "Müəllimlik",
          "speciality": "3"
        },
        {
          "_id": "65ce58cd39f0f17ad68fcaad",
          "name": "Təsərrüfat",
          "speciality": "4"
        },
        {
          "_id": "65ce58cd39f0f17ad68fcaae",
          "name": "Həkimlik",
          "speciality": "4"
        },
        {
          "_id": "65ce58cd39f0f17ad68fcaaf",
          "name": "İncəsənət və Dizayn",
          "speciality": "5"
        }
      ]
    const [mainSelector, setMainSelector] = useState('');
    // const [additionalSelector, setAdditionalSelector] = useState('');
    const [data, setData] = useState({
        firstScore: null,
        secondScore: null,
        sector: '',
        specialitygroup: '',
        undergroup: '',
        favareas:[]
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
    const handleAreaSelection = (id) => {
        let selectedAres = data.favareas;
        if(selectedAres.includes(id)){
            selectedAres = selectedAres.filter(i=>i!=id)
        }
        else{
            selectedAres.push(id)
        }
        setData(prev => ({
            ...prev,
            favareas: selectedAres
        }));
    };
    const selectAll = () => {
        const allids = areas.map(a=>a._id);
        const check = data.favareas.length === allids.length;
        setData(prev => ({
            ...prev,
            favareas: check ? []:allids
        }));
    }
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
                <p>Sahələr</p>
                <div className="areas-container">
                    {areas.map((area, index) => (
                        <React.Fragment key={area._id}>
                            {index % 4 === 0 && index !== 0 && <><br /><br /></>} {/* Add a line break after every 4 areas */}
                            <span
                                className={data.favareas.includes(area._id) ? 'selected' : 'dontselect'}
                                onClick={() => handleAreaSelection(area._id)}
                            >
                                {area.name} {data.favareas.includes(area._id) ?"-":"+"}
                            </span>
                        </React.Fragment>
                    ))}
                    <span onClick={selectAll} style={{backgroundColor:"yellow",cursor:'pointer',padding: "3px",
    borderRadius: "3px"}}>Hamsi</span>
                </div>
                <button type="submit">Hesabla</button>
            </form>
        </div>
    );
}
