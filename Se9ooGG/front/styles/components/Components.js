import styled from 'styled-components';
import { Button, Comment, Form } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import SummonerRankItem from '../../components/SummonerRankItem';

// common
export const ErrorMessage = styled.div`
  color: #e03131;
`;

// LoginForm
export const FormContainer = styled(Form)`
  padding: 3rem 0;
`;

export const InputContainer = styled.div`
  margin-bottom: 1rem;

  & label {
    display: block;
    padding-bottom: .5rem;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

// UserProfile
export const UserProfileContainer = styled.div`
  background-color: #ffffff;
  margin-top: 1rem;
  padding: 1rem;
  border: 1px solid rgba(206, 212, 218, .5);

  & img {
    display: block;
    width: 30%;
    height: 30%;
    margin-bottom: 1rem;
    border-radius: 999px;
    padding: 1rem;
  }

  & button {
    width: 100%;
  }
`;

export const UserProfileContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  @media ${props => props.theme.tablet} {
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
`;

export const UserDetail = styled.div`
  width: 100%;
`;

export const UserNickname = styled.strong`
  display: block;
  text-align: center;
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1rem;
`;

export const UserInfo = styled.dl`
  display: flex;
  width: 100%;
  font-size: 1.3rem;
  margin-bottom: 3rem;
  
  & div {
    flex-grow: 1;
    flex-basis: 30%;
    padding: 0 1rem;
    border-right: 1px solid #e5e5e5;
  }

  & div:last-child {
    border-right: none;
  }

  & dt {
    text-align: center;
    margin-bottom: 1rem;
  }

  & dd {
    text-align: center;
  }
`;

export const ProfileButtonGroup = styled.div`
  display: block;
  width: 100%;

  @media ${props => props.theme.tablet} {
    display: flex;
  }
`;

// PostForm
export const PostFormContainer = styled.div`
  width: 100%;
  padding: 1rem;
  background-color: #ffffff;
`;

export const PostContentContainer = styled.div`
  margin-bottom: 1rem;

  & strong {
    display: block;
    opacity: .5;
  }
`;

export const PostButton = styled(Button)`
  width: 100%;
`;

// PostCard
export const PostCardContentContainer = styled.div`
  margin-top: 2rem;
`;

export const PostCommentCount = styled.span`
  display: block;
  margin-top: 2rem;
  color: #ced4da;
`;

// CommentCard
export const CommentContainer = styled.div`
  padding: 2rem;
  background-color: #ffffff;
  border: 1px solid rgba(206, 212, 218, .5);
  border-top: none;
`;

export const CommentItemContainer = styled.div`
  position: relative;
`;

export const CommentDeleteBtn = styled(CloseOutlined)`
  position: absolute;
  top: 50%;
  right: 5%;
  transform: translate(0, -50%);
  cursor: pointer;

  & svg {
    width: 1.6rem;
    height: 1.6rem;
  }

  & svg:hover {
    color: #ff7875;
  }
`;

export const CommentForm = styled(Form)`
  padding: 1rem 0;
`;

export const CommentBtn = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  margin-top: 1rem;

  & button {
    display: flex;
  }
`;

// championList
export const ChampList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  max-height: 27rem;
  overflow-y: scroll;
  background-color: #ffffff;
  border: 1px solid rgba(206, 212, 218, .5);

  @media ${props => props.theme.tablet} {
    max-height: 100%;
    overflow: auto;
  }
`;

export const ChampListItem = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: .2rem;
`;

export const ChampionImg = styled.img`
  display: block;
  width: 4rem;
  height: 4rem;
`;

export const ChampionName = styled.span`
  display: block;
  width: 3rem;
  padding: .5rem 0;
  font-size: .8rem;
  text-align: center;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

export const ChampionSkillImg = styled.img`
  width: 4rem;
  height: 4rem;
`;

export const SummonerRankListItem = styled.li`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50%;
  order: ${props => props.sort};

  & img {
    width: 40%;
    height: 40%;
  }

  & h3 {
    font-size: 1.4rem;
  }

  & span {
    margin: .5rem 0;
    font-size: 1.2rem;
    color: #333333;
  }
`;

export const SummonerMostChampionListItem = styled.li`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 33%;

  & img {
    width: 40%;
    height: 40%;
    border-radius: 999px;
  }

  & strong, span {
    margin-top: .5rem;
    font-size: 1.2rem;
    color: #333333;
  }
`;

export const SummonerMatchListItem = styled.li`
  width: 100%;
  display: flex;
  align-items: center;
  background-color: #ffffff;
  margin-top: 1rem;
  padding: 1rem;
  border: 1px solid rgba(206, 212, 218, .5);
`;

export const SummonerChampion = styled.div`
  width: 18%;
  display: flex;
  flex-direction: column;
  align-items: center;

  & img {
    width: 100%;
    margin: 0;
    padding: .5rem;
    border-radius: 999px;
  }
`;

export const SummonerSpell = styled.div`
  width: 7.5%;

  & img {
    width: 100%;
  }
`;

export const SummonerRune = styled.div`
  width: 7.5%;

  & img {
    width: 100%;
  }
`;

export const SummonerKDA = styled.div`
  width: 18%;
  text-align: center;
`;

export const SummonerScore = styled.div`
  margin-bottom: .7rem;

  & span:nth-child(-n+2):after {
    diplay: block;
    content: ' / ';
  }
`;

export const SummonerKDARate = styled.div`
  font-size: .5rem;
  color: #ced4da;
`;

export const SummonerStats = styled.div`
  display: flex;
  flex-direction: column;
  font-size: .5rem;
  text-align: center;

  & span:first-child {
    margin-bottom: .5rem;
  }
`;