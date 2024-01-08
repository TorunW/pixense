import React, { ReactElement } from 'react';
import { TagObject, useStoreState } from '../../store/module';
import styled from 'styled-components/native';
import SmallText from '../Texts/SmallText';
import { colors } from '../colors';
import IconButton from '../Buttons/IconButton';
import * as Clipboard from 'expo-clipboard';
import { useRoute } from '@react-navigation/native';

const TagsView = styled.FlatList`
  width: 100%;
  row-gap: 8px;
`;

const TagContainer = styled.Pressable`
  border: solid 1px ${colors.secondary};
  border-radius: 10px;
  padding: 4px;
`;

interface FormProps {
  data: TagObject[];
}

const TagForm = ({ data }: FormProps): ReactElement => {
  console.log(data);
  console.table(data);

  const copyToClipboard = async () => {
    let tagsToClipboard: string[] = [];
    data.forEach((item) => tagsToClipboard.push(`#${item.tag.en}`));

    const textToClipborad = tagsToClipboard.toString().replace(/,/g, ' ');
    await Clipboard.setStringAsync(textToClipborad);
  };

  return (
    <>
      {data !== undefined ? (
        <>
          <IconButton
            name='copy'
            color={colors.grayLight}
            size={30}
            onPress={copyToClipboard}
            btnStyle={{
              position: 'absolute',
              right: 10,
              top: 4,
              zIndex: 10,
            }}
          />
          <TagsView
            data={data}
            renderItem={({ item }: any) => (
              <TagContainer>
                <SmallText># {item?.tag?.en}</SmallText>
              </TagContainer>
            )}
            numColumns={9}
            columnWrapperStyle={{ gap: 8, marginVertical: 4, flexWrap: 'wrap' }}
          />
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default TagForm;
