import axiosInstance from "../api/axiosInstance";
import StarRating from "./StarRating";
import qs from "qs";
import { useEffect, useRef, useState } from "react";
import SelectFilterTags from "./FilterByTagsComponents/SelectFilterTags";
import CircularProgress from "@mui/material/CircularProgress";
import {
    FilterBar,
    SearchInput,
    SortSelect,
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
    PaginationBar,
    PageButton,
    PageInfo,
    EmptyState,
} from '../styles/styleComponents/RecetteList.styles';
import { useNavigate } from "react-router-dom";

const PAGE_SIZE = 9;

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
};

type Ingredient = { id: number; name: string; quantity: number; unit: string; };

type PageResult = {
    content: Recette[];
    page: number;
    totalPages: number;
    totalElements: number;
};

function RecetteList() {
    const apibaseurl = process.env.REACT_APP_API_URL;
    const navigate = useNavigate();

    const [recetteList, setRecetteList] = useState<Recette[]>([]);
    const [filterTags, setFilterTags] = useState<string[]>([]);
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [sortBy, setSortBy] = useState<"date" | "rate">("date");
    const [loading, setLoading] = useState(true);

    const searchTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    // Fetch tags once
    useEffect(() => {
        axiosInstance.get(`${apibaseurl}/recette/getAllTags`)
            .then(res => { if (Array.isArray(res.data)) setFilterTags(res.data); })
            .catch(() => {});
    }, []);

    // Fetch paginated list (search mode)
    useEffect(() => {
        if (selectedTags.length > 0) return;
        setLoading(true);
        axiosInstance.get(`${apibaseurl}/recette`, {
            params: { page: currentPage, size: PAGE_SIZE, name: searchQuery, sort: sortBy },
        })
            .then(res => {
                const data: PageResult = res.data;
                setRecetteList(data.content ?? []);
                setTotalPages(data.totalPages ?? 0);
            })
            .catch(() => setRecetteList([]))
            .finally(() => setLoading(false));
    }, [currentPage, selectedTags, sortBy]);

    // Debounce search → reset to page 0 then fetch
    const handleSearchChange = (value: string) => {
        setSearchQuery(value);
        if (searchTimer.current) clearTimeout(searchTimer.current);
        searchTimer.current = setTimeout(() => {
            setCurrentPage(0);
            setSelectedTags([]);
            setLoading(true);
            axiosInstance.get(`${apibaseurl}/recette`, {
                params: { page: 0, size: PAGE_SIZE, name: value, sort: sortBy },
            })
                .then(res => {
                    const data: PageResult = res.data;
                    setRecetteList(data.content ?? []);
                    setTotalPages(data.totalPages ?? 0);
                })
                .catch(() => setRecetteList([]))
                .finally(() => setLoading(false));
        }, 300);
    };

    // Tag filter (no pagination — fetches all matching)
    useEffect(() => {
        if (selectedTags.length === 0) return;
        setLoading(true);
        setCurrentPage(0);
        setTotalPages(0);
        axiosInstance.get(`${apibaseurl}/recette/getByTags`, {
            params: { tags: selectedTags },
            paramsSerializer: (params) => qs.stringify(params, { arrayFormat: "comma" }),
        })
            .then(res => { if (Array.isArray(res.data)) setRecetteList(res.data); })
            .catch(() => setRecetteList([]))
            .finally(() => setLoading(false));
    }, [selectedTags]);

    const handleFilterByTags = (tags: string[]) => {
        setSelectedTags(tags);
        setSearchQuery("");
    };

    const handleSortChange = (value: "date" | "rate") => {
        setSortBy(value);
        setCurrentPage(0);
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const showPagination = selectedTags.length === 0 && totalPages > 1;

    return (
        <div>
            <FilterBar>
                <SearchInput
                    type="text"
                    placeholder="Rechercher une recette…"
                    value={searchQuery}
                    onChange={(e) => handleSearchChange(e.target.value)}
                />
                <SelectFilterTags filterTagsList={filterTags} onSelectTags={handleFilterByTags} />
                <SortSelect
                    value={sortBy}
                    onChange={(e) => handleSortChange(e.target.value as "date" | "rate")}
                    aria-label="Trier par"
                    style={{ marginLeft: 'auto' }}
                >
                    <option value="date">Plus récentes</option>
                    <option value="rate">Mieux notées</option>
                </SortSelect>
            </FilterBar>

            {loading ? (
                <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem' }}>
                    <CircularProgress sx={{ color: '#166534' }} />
                </div>
            ) : (
                <>
                    <RecetteListWrapper>
                        {recetteList.length === 0 ? (
                            <EmptyState>Aucune recette trouvée.</EmptyState>
                        ) : recetteList.map((recette) => (
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

                    {showPagination && (
                        <PaginationBar>
                            <PageButton onClick={() => handlePageChange(0)} disabled={currentPage === 0}>«</PageButton>
                            <PageButton onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 0}>‹</PageButton>
                            {Array.from({ length: totalPages }, (_, i) => i)
                                .filter(i => Math.abs(i - currentPage) <= 2)
                                .map(i => (
                                    <PageButton key={i} $active={i === currentPage} onClick={() => handlePageChange(i)}>
                                        {i + 1}
                                    </PageButton>
                                ))}
                            <PageButton onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage >= totalPages - 1}>›</PageButton>
                            <PageButton onClick={() => handlePageChange(totalPages - 1)} disabled={currentPage >= totalPages - 1}>»</PageButton>
                            <PageInfo>{currentPage + 1} / {totalPages}</PageInfo>
                        </PaginationBar>
                    )}
                </>
            )}
        </div>
    );
}

export default RecetteList;
