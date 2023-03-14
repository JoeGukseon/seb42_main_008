import ReactQuill from 'react-quill';
import styled from 'styled-components';
import 'react-quill/dist/quill.snow.css';
import { useState } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ko from 'date-fns/locale/ko';
import CountrySelectModal from 'components/ContentAdd/CountrySelectModal';
import SearchMap from 'components/ContentAdd/SearchMap';
import TendencyModal from 'components/ContentAdd/TendencyModal';

registerLocale('ko', ko);

const ContentAdd = () => {
  const modules = {
    toolbar: {
      container: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        [{ font: [] }],
        [{ align: [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ list: 'ordered' }, { list: 'bullet' }, 'link'],
        [
          {
            color: [
              '#000000',
              '#e60000',
              '#ff9900',
              '#ffff00',
              '#008a00',
              '#0066cc',
              '#9933ff',
              'custom-color',
            ],
          },
          { background: [] },
        ],
        ['image', 'video'],
        ['clean'],
      ],
    },
  };
  // 대륙 선택 옵션
  const [continentSelect, setContinentSelect] = useState('');
  let title = '대륙을 선택하세요!';
  let titleImg =
    'https://cdn.pixabay.com/photo/2022/10/22/19/11/travel-7539914__480.jpg';
  if (continentSelect === '유럽') {
    title = 'Europe';
    titleImg =
      'https://cdn.pixabay.com/photo/2020/07/12/16/40/paris-5397889_1280.jpg';
  } else if (continentSelect === '아프리카') {
    title = 'Africa';
    titleImg =
      'https://cdn.pixabay.com/photo/2019/03/02/21/25/morocco-4030733_1280.jpg';
  } else if (continentSelect === '아시아') {
    title = 'Asia';
    titleImg =
      'https://cdn.pixabay.com/photo/2020/07/23/01/16/heritage-5430081_1280.jpg';
  } else if (continentSelect === '북아메리카') {
    title = 'North America';
    titleImg =
      'https://cdn.pixabay.com/photo/2020/06/08/20/58/nyc-5276112__480.jpg';
  } else if (continentSelect === '남아메리카') {
    title = 'South America';
    titleImg =
      'https://cdn.pixabay.com/photo/2019/02/06/00/06/peru-3978148_1280.jpg';
  } else if (continentSelect === '오세아니아') {
    title = 'Oceania';
    titleImg =
      'https://cdn.pixabay.com/photo/2019/05/15/18/22/sydney-4205646_1280.jpg';
  } else if (continentSelect === '대륙선택') {
    title = '대륙을 선택하세요!';
    titleImg =
      'https://cdn.pixabay.com/photo/2022/10/22/19/11/travel-7539914__480.jpg';
  }

  // 국가 선택 모달
  const [countryModal, setCountryModal] = useState(false);
  const handleCountryModal = () => {
    setCountryModal(!countryModal);
  };
  const [titleInput, setTitleInput] = useState('');
  const [contentInput, setContentInput] = useState('');
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const [isTendencyModal, setIsTendencyModal] = useState(false);
  // const [isThemeModal, setIsThemeModal] = useState(false);

  const handleContentSubmit = () => {
    if (!titleInput) {
      alert('글 제목을 입력해주세요!');
      return;
    }
    if (!contentInput.replace(/<\/?p>/gi, '')) {
      alert('글 내용을 작성해주세요!');
      return;
    }
    if (!startDate || !endDate) {
      alert('날짜를 입력해주세요!');
      return;
    }
    if (titleInput && contentInput && startDate && endDate) {
      setIsTendencyModal(!isTendencyModal);
    }
  };

  return (
    <ContentAddContainer>
      <TitleBox style={{ backgroundImage: `url(${titleImg})` }}>
        <h1>{title}</h1>
        <p>동행자를 모집하는 글을 작성해보세요!</p>
      </TitleBox>
      <ContentBox>
        <nav className="location-select">
          <div>
            <label>대륙</label>
            <select
              value={continentSelect}
              onChange={event => setContinentSelect(event.target.value)}
            >
              <option value="대륙선택">대륙선택</option>
              <option value="유럽">유럽</option>
              <option value="아시아">아시아</option>
              <option value="북아메리카">북아메리카</option>
              <option value="남아메리카">남아메리카</option>
              <option value="아프리카">아프리카</option>
              <option value="오세아니아">오세아니아</option>
            </select>
          </div>
          <div className="country-state">
            <label>나라</label>
            <div className="country-name">잉글랜드</div>
          </div>
          <button onClick={handleCountryModal}>선택</button>
        </nav>
        <div className="add-set">
          <label>제목</label>
          <input
            className="title-input"
            onChange={event => setTitleInput(event.target.value)}
          ></input>
          {titleInput}
        </div>
        <div className="add-set">
          <label>여행 날짜</label>
          <div className="date-picker">
            <DatePicker
              selected={startDate}
              onChange={(date: Date) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              placeholderText="Start Date"
              dateFormat="yyyy-MM-dd"
            />
            ~
            <DatePicker
              selected={endDate}
              onChange={(date: Date) => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              placeholderText="End Date"
              dateFormat="yyyy-MM-dd"
            />
          </div>
        </div>
        <div className="add-set">
          <label>여행 장소</label>
          <SearchMap />
        </div>
        <div className="add-set">
          <label>모집 내용</label>
          <ReactQuill
            theme="snow"
            modules={modules}
            onChange={event => {
              setContentInput(event);
            }}
          />
        </div>
        <button className="add-form" onClick={handleContentSubmit}>
          다음
        </button>
      </ContentBox>
      {countryModal ? (
        <div className="overlay">
          <CountrySelectModal setCountryModal={setCountryModal} />
        </div>
      ) : null}
      {isTendencyModal ? (
        <div className="overlay">
          <TendencyModal setIsTendencyModal={setIsTendencyModal} />
        </div>
      ) : null}
    </ContentAddContainer>
  );
};

export default ContentAdd;

const ContentAddContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: auto;
  align-items: center;
  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
  }
`;

const TitleBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 300px;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  color: white;
  font-weight: bold;
  > h1 {
    font-size: 4rem;
  }
`;

const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 724px;
  align-items: center;
  justify-content: center;
  padding-bottom: 30px;
  .date-picker {
    display: flex;
    width: 50%;
    .react-datepicker-wrapper {
      width: 120px;
      > div {
        > input {
          width: 120px;
          outline: none;
          cursor: pointer;
        }
      }
    }
  }
  .country-name {
    background-color: #cecece;
    text-align: center;
    color: white;
    width: 200px;
    height: 36px;
    font-size: 1.5rem;
    border-radius: 30px;
  }
  .location-select {
    display: flex;
    padding: 20px;
    width: 100%;
    justify-content: space-between;
    font-size: 1.5rem;
    align-items: center;
    border-bottom: 1px solid #dddddd;
    > div {
      display: flex;
      align-items: center;
      width: 40%;
      justify-content: space-around;
      > select {
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        display: flex;
        border: none;
        outline: none;
        align-items: center;
        justify-content: center;
        border: none;
        padding-left: 20px;
        width: 200px;
        height: 36px;
        background-color: #feb35c;
        border-radius: 30px;
        font-size: 1.5rem;
        color: white;
      }
    }
    > button {
      border: none;
      background-color: #feb35c;
      color: white;
      width: 96px;
      height: 36px;
      font-size: 1.5rem;
      border-radius: 30px;
      cursor: pointer;
    }
  }
  .add-set {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-top: 10px;
    margin-bottom: 10px;
    font-size: 1.3rem;
  }
  .ql-container {
    box-sizing: border-box;
    font-family: 'Gowun Batang';
    font-size: 1.25rem;
    font-weight: 400;
    color: #565759;
    min-height: 15rem;
    margin: 0px;
    position: relative;
  }
  .ql-editor {
    min-height: 15rem;
  }
  @media screen and (max-width: 600px) {
    .ql-container {
      font-size: 1.125rem;
    }
  }
  .title-input {
    border-radius: 20px;
    border: 1px solid #555555;
    outline: none;
    width: 100%;
    height: 30px;
    padding-left: 10px;
  }
  .day-input {
    border-radius: 20px;
    border: 1px solid #555555;
    outline: none;
    width: 50%;
    height: 30px;
    padding-left: 10px;
  }

  .add-form {
    border: none;
    background-color: #feb35c;
    color: white;
    width: 96px;
    height: 36px;
    font-size: 1.5rem;
    border-radius: 30px;
    cursor: pointer;
  }
`;
