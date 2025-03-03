import axios from "axios";
import qs from "qs";
import {useEffect, useState} from "react";
import RecetteInfo from "./RecetteInfoComponents/RecetteInfo"
import SelectFilterTags from "./FilterByTagsComponents/SelectFilterTags"
import "../styles/css/RecetteList.css";
import {
    RecetteListWrapper,
    RecetteCard ,
    RecetteName ,
    RecetteDetails,
    RecetteRate,
    RecetteDate,
    TagList,
    Tag,
    AddRecetteButton
}from '../styles/styleComponents/RecetteList.styles'
import {useNavigate} from "react-router-dom";

type Recette = {
    id: number;
    name: string;
    rate: number;
    date: Date;
    ingredients:Ingredient[];
    steps: string[];
    tags: string[];

}

type Ingredient = {
    id: number;
    name: string;
    quantity: number;
    unit: string;
}

function RecetteList(){

    const navigate = useNavigate();
    const [recetteList, setRecetteList] = useState<Recette[]>([]);

    const [error, setError] = useState<string | null>(null);

    const [selectedRecette, setSelectedRecette] = useState<Recette | null>(null);

    const [filterTags, setFilterTags] = useState<string[]>([]);

    const [selectedTags, setSelectedTags] = useState<string[]>([]);

    function handleFilterByTags(tags:string[]){
        setSelectedTags(tags);
    }

    function goToAddRecette(){
        navigate("/recetteForm");
    }

    useEffect(() => {
        const fetchRecetteList = async () => {
            try{
                const response = await axios.get('http://localhost:8080/api/v1/recette');
                const RecetteListData = response.data;
                if (Array.isArray(RecetteListData)) {
                    setRecetteList(RecetteListData);
                }
            }catch (err: unknown) {
                if (axios.isAxiosError(err)) {
                    const message = err.response?.data?.error?.message || err.message;
                    console.error('Error fetching recettelist:', message);

                } else {
                    console.error('Error fetching recettelist:', err);
                    setError('An unknown error occurred');
                    console.log(error);
                }
            }
        }

        const fetchTagsFilter = async () =>{
            try{
                const response = await axios.get('http://localhost:8080/api/v1/recette/getAllTags');
                const filterTagslist = response?.data;
                if(Array.isArray((filterTagslist))){
                    setFilterTags(filterTagslist);
                }
            }catch(err:unknown){
                if(axios.isAxiosError(err)){
                    const message = err.response?.data?.error?.message || err.message;
                    console.error('Error fetching filtertags:', message);
                }else{
                    console.error('Error fetching filtertags:', err);
                    setError('An unknown error occurred');
                    console.log(error);
                }
            }
        }
        fetchRecetteList();
        fetchTagsFilter();
    }, []);

    useEffect(() => {
        const fetchFilteredRecetteList = async () => {
            try {
                console.log(selectedTags);
                if(selectedTags.length!=0){
                    const response = await axios.get('http://localhost:8080/api/v1/recette/getByTags', {
                        params: {tags: selectedTags},
                        paramsSerializer: (params) => qs.stringify(params, { arrayFormat: "comma" })
                    });
                    setRecetteList(response?.data);
                }else{
                    const response = await axios.get('http://localhost:8080/api/v1/recette');
                    const RecetteListData = response.data;
                    if (Array.isArray(RecetteListData)) {
                        setRecetteList(RecetteListData);
                    }
                }

            } catch(err: unknown){
                if (axios.isAxiosError(err)) {
                    const message = err.response?.data?.error?.message || err.message;
                    console.error('Error fetching recettelist:', message);

                } else {
                    console.error('Error fetching recettelist:', err);
                    setError('An unknown error occurred');
                    console.log(error);
                }
            }
        }
        fetchFilteredRecetteList();
    }, [selectedTags]);



    if(selectedRecette){
        return (
            <RecetteInfo
                recette={selectedRecette}
                onBack={() => {
                    setSelectedRecette(null);
                    setSelectedTags([]);
                }}
            />
        );
    }

    return (
        <div>
            <header className="header">
                <h1>Bienvenue dans notre livre de recette</h1>
                <AddRecetteButton onClick={goToAddRecette}>ajouter une recette</AddRecetteButton>
            </header>

            <SelectFilterTags filterTagsList={filterTags} onSelectTags={handleFilterByTags}/>

            <RecetteListWrapper>
                {recetteList.map((recette) => (
                    <RecetteCard key={recette.id} onClick={() => setSelectedRecette(recette)}>
                        <RecetteName>{recette.name}</RecetteName>
                        <RecetteDetails>
                            <RecetteRate>⭐ {recette.rate}/5</RecetteRate>
                            <RecetteDate>{new Date(recette.date).toLocaleDateString()}</RecetteDate>
                        </RecetteDetails>
                        <TagList>
                            {recette.tags.map((tag, idx) => (
                                <Tag key={idx}>{tag}</Tag>
                            ))}
                        </TagList>
                    </RecetteCard>
                ))}
            </RecetteListWrapper>
        </div>


    );

}
export default RecetteList
