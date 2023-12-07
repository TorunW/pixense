import React, { ReactElement } from 'react';
import { useStoreState } from '../../store/module';
import styled from 'styled-components/native';
import SmallText from '../Texts/SmallText';
import { colors } from '../colors';
import IconButton from '../Buttons/IconButton';

const dummyData = [
  { confidence: 33.7128410339355, tag: { en: 'person' } },
  { confidence: 33.0324211120605, tag: { en: 'man' } },
  { confidence: 32.6051635742188, tag: { en: 'happy' } },
  { confidence: 32.0849838256836, tag: { en: 'smile' } },
  { confidence: 32.0167007446289, tag: { en: 'hat' } },
  { confidence: 31.2540969848633, tag: { en: 'people' } },
  { confidence: 31.0991821289062, tag: { en: 'adult' } },
  { confidence: 26.9691390991211, tag: { en: 'male' } },
  { confidence: 26.1055545806885, tag: { en: 'suit' } },
  { confidence: 23.5220108032227, tag: { en: 'happiness' } },
  { confidence: 23.1620635986328, tag: { en: 'smiling' } },
  { confidence: 20.9153461456299, tag: { en: 'businesswoman' } },
  { confidence: 20.7180919647217, tag: { en: 'portrait' } },
  { confidence: 20.6615200042725, tag: { en: 'business' } },
  { confidence: 20.6084594726562, tag: { en: 'face' } },
  { confidence: 19.8185520172119, tag: { en: 'holding' } },
  { confidence: 19.6311950683594, tag: { en: 'expression' } },
  { confidence: 18.9013519287109, tag: { en: 'attractive' } },
  { confidence: 18.8988475799561, tag: { en: 'pretty' } },
  { confidence: 18.8581619262695, tag: { en: 'life' } },
  { confidence: 17.5918655395508, tag: { en: 'cap' } },
  { confidence: 16.907283782959, tag: { en: 'success' } },
  { confidence: 16.4418506622314, tag: { en: 'student' } },
  { confidence: 16.3301544189453, tag: { en: 'corporate' } },
  { confidence: 16.1177253723145, tag: { en: 'professional' } },
  { confidence: 15.8957004547119, tag: { en: 'businessman' } },
  { confidence: 15.590690612793, tag: { en: 'education' } },
  { confidence: 15.0724601745605, tag: { en: 'smart' } },
  { confidence: 15.0332803726196, tag: { en: 'black' } },
  { confidence: 14.3483095169067, tag: { en: 'university' } },
  { confidence: 13.9475831985474, tag: { en: 'couple' } },
  { confidence: 13.8247394561768, tag: { en: 'cheerful' } },
  { confidence: 13.8036231994629, tag: { en: 'lady' } },
  { confidence: 13.7431516647339, tag: { en: 'lifestyle' } },
  { confidence: 13.7277173995972, tag: { en: 'friendly' } },
  { confidence: 13.6554555892944, tag: { en: 'confident' } },
  { confidence: 12.9271278381348, tag: { en: 'studio' } },
  { confidence: 12.919415473938, tag: { en: 'hand' } },
  { confidence: 12.9030084609985, tag: { en: 'group' } },
  { confidence: 12.858078956604, tag: { en: 'office' } },
  { confidence: 12.7679872512817, tag: { en: 'graduation' } },
  { confidence: 12.7677297592163, tag: { en: 'celebration' } },
  { confidence: 12.5645151138306, tag: { en: 'work' } },
  { confidence: 12.0866079330444, tag: { en: 'gown' } },
  { confidence: 12.0675954818726, tag: { en: 'fashion' } },
  { confidence: 12.054425239563, tag: { en: 'sexy' } },
  { confidence: 12.0029706954956, tag: { en: 'looking' } },
  { confidence: 11.9283571243286, tag: { en: 'youth' } },
  { confidence: 11.9165534973145, tag: { en: '20s' } },
  { confidence: 11.8143968582153, tag: { en: 'graduate' } },
  { confidence: 11.6980619430542, tag: { en: 'joy' } },
  { confidence: 11.5966062545776, tag: { en: 'handsome' } },
  { confidence: 11.506688117981, tag: { en: 'job' } },
  { confidence: 11.4678230285645, tag: { en: 'formal' } },
  { confidence: 11.1782245635986, tag: { en: 'manager' } },
  { confidence: 10.8944864273071, tag: { en: 'model' } },
  { confidence: 10.7550649642944, tag: { en: 'spectator' } },
  { confidence: 10.6906986236572, tag: { en: 'colleagues' } },
  { confidence: 10.4409608840942, tag: { en: 'college' } },
  { confidence: 10.2864179611206, tag: { en: 'women' } },
  { confidence: 10.1471500396729, tag: { en: 'emotion' } },
  { confidence: 9.97899150848389, tag: { en: 'clothing' } },
  { confidence: 9.87851810455322, tag: { en: 'school' } },
  { confidence: 9.7697925567627, tag: { en: 'executive' } },
  { confidence: 9.74522018432617, tag: { en: 'scholar' } },
  { confidence: 9.73479843139648, tag: { en: 'fun' } },
  { confidence: 9.64601039886475, tag: { en: 'together' } },
  { confidence: 9.58765125274658, tag: { en: 'brunette' } },
  { confidence: 9.42734813690186, tag: { en: 'elegant' } },
  { confidence: 9.33265781402588, tag: { en: 'cute' } },
  { confidence: 9.1177806854248, tag: { en: 'girls' } },
  { confidence: 8.95746612548828, tag: { en: 'mortarboard' } },
  { confidence: 8.86414623260498, tag: { en: 'diploma' } },
  { confidence: 8.82256126403809, tag: { en: 'academic' } },
  { confidence: 8.72243595123291, tag: { en: 'hair' } },
  { confidence: 8.69626617431641, tag: { en: 'architect' } },
  { confidence: 8.68800449371338, tag: { en: 'love' } },
  { confidence: 8.67476844787598, tag: { en: 'helmet' } },
  { confidence: 8.66196727752686, tag: { en: '30s' } },
  { confidence: 8.60573196411133, tag: { en: 'holiday' } },
  { confidence: 8.52874851226807, tag: { en: 'child' } },
  { confidence: 8.4799633026123, tag: { en: 'casual' } },
  { confidence: 8.46080875396729, tag: { en: 'friends' } },
  { confidence: 8.35722827911377, tag: { en: 'drink' } },
  { confidence: 8.34963893890381, tag: { en: 'color' } },
  { confidence: 8.28980350494385, tag: { en: 'safety' } },
  { confidence: 8.27467155456543, tag: { en: 'joyful' } },
  { confidence: 8.19041728973389, tag: { en: 'worker' } },
  { confidence: 8.03348922729492, tag: { en: 'costume' } },
  { confidence: 7.98113298416138, tag: { en: 'kid' } },
  { confidence: 7.9554615020752, tag: { en: 'employee' } },
  { confidence: 7.88747453689575, tag: { en: 'degree' } },
  { confidence: 7.78175640106201, tag: { en: 'intellectual' } },
  { confidence: 7.66082096099854, tag: { en: 'profession' } },
  { confidence: 7.65388822555542, tag: { en: 'staff' } },
  { confidence: 7.62803220748901, tag: { en: 'two' } },
  { confidence: 7.59717607498169, tag: { en: 'businesspeople' } },
  { confidence: 7.59235572814941, tag: { en: 'tie' } },
  { confidence: 7.57582998275757, tag: { en: 'career' } },
  { confidence: 7.32355308532715, tag: { en: 'successful' } },
  { confidence: 7.16962289810181, tag: { en: 'childhood' } },
  { confidence: 7.12133073806763, tag: { en: 'family' } },
];

const TagsView = styled.FlatList`
  width: 100%;
  row-gap: 8px;
`;

const TagContainer = styled.Pressable`
  border: solid 1px ${colors.secondary};
  border-radius: 10px;
  padding: 4px;
`;

const TagForm = (): ReactElement => {
  const tags = useStoreState((state) => state.tags);

  return (
    <>
      <IconButton
        name='copy'
        color={colors.grayLight}
        size={30}
        onPress={() => console.log('copy text')}
        btnStyle={{
          position: 'absolute',
          right: 10,
          top: 4,
          zIndex: 10,
        }}
      />
      <TagsView
        data={tags.length !== 0 ? tags : dummyData}
        renderItem={({ item }: any) => (
          <TagContainer>
            <SmallText># {item.tag.en}</SmallText>
          </TagContainer>
        )}
        numColumns={9}
        columnWrapperStyle={{ gap: 8, marginVertical: 4, flexWrap: 'wrap' }}
      />
    </>
  );
};

export default TagForm;
