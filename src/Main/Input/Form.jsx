import React, { useEffect, useState } from 'react';
import './FormStyle.css';
import axios from 'axios';

export default function Form({setshowingdata}) {
    const baseUrlL = "http://localhost:5000"
    const baseUrlD = "https://bakalavr-speciality-compasaz-22w4a.ondigitalocean.app";
    const url = baseUrlD+"/api/calculate";
    const [areas,setAreas] = useState([])
    useEffect(()=>{
      const ftch = async() => {
        try {
          const {data} = await axios.get(baseUrlD+"/api/saheler");
          console.log(data)
          setAreas(data.data)
        } catch (error) {
          
        }
      }
      ftch();
    },[])
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
    const handleDownload = async () => {
      try {
        // Make a GET request to the download endpoint
        const response = await axios.get('http://localhost:8080/download-region-tickets/102', {
          responseType: 'blob', // Set responseType to blob for file download
        });
        console.log(response)
  
        // Create a Blob from the response data
        const blob = new Blob([response.data], { type: 'application/csv' });
  
        // Create a URL for the Blob object
        const url = window.URL.createObjectURL(blob);
  
        // Create a temporary link element
        const link = document.createElement('a');
        link.href = url;
  
        // Set the filename for the downloaded file
        link.setAttribute('download', 'region_tickets.csv');
  
        // Append the link to the document body
        document.body.appendChild(link);
  
        // Trigger a click event on the link to initiate the download
        link.click();
  
        // Remove the temporary link from the document body
        document.body.removeChild(link);
      } catch (error) {
        console.error('Error downloading file:', error);
      }
    };
    return (
        <div>
            <form onSubmit={handleOnSubmit}>
                <p>Bölmə</p>
                <select name="sector" id="Bölmə" value={data.sector} onChange={handleOnChange}>
                <option >Bolme sec</option>
                    <option value="Aze">Azərbaycan</option>
                    <option value="Rus">Rus</option>
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
