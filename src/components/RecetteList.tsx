import axios from "axios";
import qs from "qs";
import {useEffect, useState} from "react";
import SelectFilterTags from "./FilterByTagsComponents/SelectFilterTags"
import {
    PageHeader,
    HeaderTitle,
    FilterBar,
    SearchInput,
    RecetteListWrapper,
    RecetteCard,
    CardImage,
    RecetteName,
    RecetteDetails,
    RecetteRate,
    RecetteDate,
    TagList,
    Tag,
    AddRecetteButton,
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

    function goToAddRecette(){
        navigate("/recetteForm");
    }

    useEffect(() => {
        const fetchRecetteList = async () => {
            try{
                const response = await axios.get(`${apibaseurl}/recette`);
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
                const response = await axios.get(`${apibaseurl}/recette/getAllTags`);
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
                    const response = await axios.get(`${apibaseurl}/recette/getByTags`, {
                        params: {tags: selectedTags},
                        paramsSerializer: (params) => qs.stringify(params, { arrayFormat: "comma" })
                    });
                    setRecetteList(response?.data);
                }else{
                    const response = await axios.get(`${apibaseurl}/recette`);
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
            <PageHeader>
                <HeaderTitle>📖 Mon Livre de Recettes</HeaderTitle>
                <AddRecetteButton onClick={goToAddRecette}>+ Ajouter une recette</AddRecetteButton>
            </PageHeader>

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
                        <RecetteName>{recette.name}</RecetteName>
                        <RecetteDetails>
                            <RecetteRate>⭐ {recette.rate}/5</RecetteRate>
                            {recette.prepTime && <RecetteDate>⏱ {recette.prepTime} min</RecetteDate>}
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
