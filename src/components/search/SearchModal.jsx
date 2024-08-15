import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import { MdClose } from "react-icons/md";
import { SearchModalStyles } from "../../styles/search/SearchModalStyles";
import { SearchModalContext } from "../../context/SearchModalContextProvider";
import ActionButton from "../buttons/ActionButton";
import SearchField from "./SearchField";
import SearchResult from "./SearchResult";
import axios from "axios";

const query = graphql`
  {
    localSearchBlogs {
      publicStoreURL
      publicIndexURL
    }
    localSearchCategories {
      publicStoreURL
      publicIndexURL
    }
    localSearchAuthors {
      publicStoreURL
      publicIndexURL
    }
  }
`;

const Search = () => {
  const { isSearchModalOpen, closeSearchModal } =
    React.useContext(SearchModalContext);
  const [searchQuery, setSearchQuery] = React.useState("");
  const data = useStaticQuery(query);
  const [blogsIndexStore, setBlogsIndexStore] = React.useState(null);
  const [categoriesIndexStore, setCategoriesIndexStore] = React.useState(null);
  const [authorsIndexStore, setAuthorsIndexStore] = React.useState(null);

  const {
    publicStoreURL: blogsPublicStoreURL,
    publicIndexURL: blogsPublicIndexURL,
  } = data.localSearchBlogs;
  const {
    publicStoreURL: categoriesPublicStoreURL,
    publicIndexURL: categoriesPublicIndexURL,
  } = data.localSearchCategories;
  const {
    publicStoreURL: authorsPublicStoreURL,
    publicIndexURL: authorsPublicIndexURL,
  } = data.localSearchAuthors;

  const handleOnFocus = async () => {
    if (blogsIndexStore && categoriesIndexStore && authorsIndexStore) return;

    const [
      { data: blogsIndex },
      { data: blogsStore },
      { data: categoriesIndex },
      { data: categoriesStore },
      { data: authorsIndex },
      { data: authorsStore },
    ] = await Promise.all([
      axios.get(`${blogsPublicIndexURL}`),
      axios.get(`${blogsPublicStoreURL}`),
      axios.get(`${categoriesPublicIndexURL}`),
      axios.get(`${categoriesPublicStoreURL}`),
      axios.get(`${authorsPublicIndexURL}`),
      axios.get(`${authorsPublicStoreURL}`),
    ]);

    setBlogsIndexStore({
      index: blogsIndex,
      store: blogsStore,
    });
    setCategoriesIndexStore({
      index: categoriesIndex,
      store: categoriesStore,
    });
    setAuthorsIndexStore({
      index: authorsIndex,
      store: authorsStore,
    });
  };

  const handleKeyDown = (event) => {
    if (event.key === "Escape") {
      closeSearchModal();
    }
  };

  React.useEffect(() => {
    if (isSearchModalOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isSearchModalOpen]);

  if (!isSearchModalOpen) return null;

  return (
    <SearchModalStyles>
      <div className="modal__container">
        <ActionButton className="close" onClick={() => closeSearchModal()}>
          <MdClose />
        </ActionButton>
        <SearchField
          value={searchQuery}
          setValue={setSearchQuery}
          onFocus={handleOnFocus}
        />
        {searchQuery &&
          blogsIndexStore &&
          categoriesIndexStore &&
          authorsIndexStore && (
            <div className="search__result">
              <SearchResult
                searchQuery={searchQuery}
                blogsIndexStore={blogsIndexStore}
                categoriesIndexStore={categoriesIndexStore}
                authorsIndexStore={authorsIndexStore}
              />
            </div>
          )}
      </div>
    </SearchModalStyles>
  );
};

export default Search;
