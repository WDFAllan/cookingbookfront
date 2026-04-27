import axios from "axios";
import axiosInstance from "../api/axiosInstance";
import StarRating from "./StarRating";
import qs from "qs";
import {useEffect, useState} from "react";
import SelectFilterTags from "./FilterByTagsComponents/SelectFilterTags"
import {
    FilterBar,
    SearchInput,
    RecetteListWrapper,
    RecetteCard,
    CardImage,
    CardBody,
    RecetteName,
    RecetteDetails,
    RecetteRate,
    RecetteDate,
    TagList,
    Tag,
} from '../styles/styleComponents/RecetteList.styles'
import {useNavigate} from "react-router-dom";


type Recette = {
    id: number;
    name: string;
    rate: number;
    date: Date;
    ingredients: Ingredient[];
    steps: string[];
    tags: string[];
    imageUrl?: string;
    prepTime?: number;
    servings?: number;
}

type Ingredient = {
    id: number;
    name: string;
    quantity: number;
    unit: string;
}

function RecetteList(){

    const apibaseurl = process.env.REACT_APP_API_URL;

    const navigate = useNavigate();
    const [recetteList, setRecetteList] = useState<Recette[]>([]);

    const [error, setError] = useState<string | null>(null);

    const [filterTags, setFilterTags] = useState<string[]>([]);
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>("");

    function handleFilterByTags(tags:string[]){
        setSelectedTags(tags);
    }

    useEffect(() => {
        const fetchRecetteList = async () => {
            try{
                const response = await axiosInstance.get(`${apibaseurl}/recette`);
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
                const response = await axiosInstance.get(`${apibaseurl}/recette/getAllTags`);
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
                    const response = await axiosInstance.get(`${apibaseurl}/recette/getByTags`, {
                        params: {tags: selectedTags},
                        paramsSerializer: (params) => qs.stringify(params, { arrayFormat: "comma" })
                    });
                    setRecetteList(response?.data);
                }else{
                    const response = await axiosInstance.get(`${apibaseurl}/recette`);
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



    const filteredList = recetteList.filter(r =>
        r.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div>
            <FilterBar>
                <SearchInput
                    type="text"
                    placeholder="Rechercher une recette…"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <SelectFilterTags filterTagsList={filterTags} onSelectTags={handleFilterByTags}/>
            </FilterBar>

            <RecetteListWrapper>
                {filteredList.map((recette) => (
                    <RecetteCard key={recette.id} onClick={() => navigate(`/recette/${recette.id}`)}>
                        {recette.imageUrl && (
                            <CardImage src={recette.imageUrl} alt={recette.name} />
                        )}
                        <CardBody>
                            <RecetteName>{recette.name}</RecetteName>
                            <RecetteDetails>
                                <RecetteRate><StarRating rate={recette.rate} size="0.9rem" /></RecetteRate>
                                {recette.prepTime && <RecetteDate>· ⏱ {recette.prepTime} min</RecetteDate>}
                            </RecetteDetails>
                            <TagList>
                                {recette.tags.map((tag, idx) => (
                                    <Tag key={idx}>{tag}</Tag>
                                ))}
                            </TagList>
                        </CardBody>
                    </RecetteCard>
                ))}
            </RecetteListWrapper>
        </div>
    );

}
export default RecetteList
