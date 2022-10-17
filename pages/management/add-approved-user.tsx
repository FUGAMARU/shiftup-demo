// Next.js
import { NextPage } from "next"
import Head from "next/head"

// React Hooks
import { useState } from "react"

// Chakra UI Components
import { Flex, Grid, Text, Box, Input, Select, Radio, RadioGroup, Stack } from "@chakra-ui/react"

// Custom Components
import Body from "../../components/Body"
import SendButton from "../../components/button/SendButton"

// Libraries
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPen, faCheck, faScrewdriverWrench, faUser } from "@fortawesome/free-solid-svg-icons"

// Functions
import { resp } from "../../functions"

const AddApprovedUser: NextPage = () => {
  const [userAttribute, setUserAttribute] = useState("cast")

  return (
    <>
      <Head>
        <title>認可ユーザー追加 | ShiftUP!</title>
      </Head>

      <Body title="認可ユーザー追加" content={
        <Flex justifyContent="center">
          <Grid gridTemplateColumns="repeat(2, auto)" gridTemplateRows="repeat(8, auto)">
            <Flex className="flex-center">
              <FontAwesomeIcon className="secondary-color" icon={faPen} fontSize={25}></FontAwesomeIcon>
            </Flex>
            <Flex pl={resp(6, 12, 12)} alignItems="center">
              <Text className="kb" fontSize={resp("1.5rem", "1.8rem", "1.9rem")}>学籍番号を入力</Text>
            </Flex>
            <Flex className="flex-center">
              <Box className="secondary-color" h="80px" borderLeft="dotted 4px"></Box>
            </Flex>
            <Flex pl={resp(8, 16, 16)} py={5} alignItems="center">
              <Input className="ksb" w={resp(250, 350, 350)} placeholder="(入力例) G021C1234" bg="white" focusBorderColor="#48c3eb"></Input>
            </Flex>
            <Flex className="flex-center">
              <FontAwesomeIcon className="secondary-color" icon={faScrewdriverWrench} fontSize={25}></FontAwesomeIcon>
            </Flex>
            <Flex pl={resp(6, 12, 12)} alignItems="center">
              <Text className="kb" fontSize={resp("1.5rem", "1.8rem", "1.9rem")}>学科を選択</Text>
            </Flex>
            <Flex className="flex-center">
              <Box className="secondary-color" h="80px" borderLeft="dotted 4px"></Box>
            </Flex>
            <Flex pl={resp(9, 16, 16)} py={5} alignItems="center">
              <Select w={resp(245, 350, 350)} placeholder="学科を選択">
                <optgroup label="クリエイターズカレッジ">
                  <option value="B2">放送芸術科</option>
                  <option value="T2">声優・演劇科</option>
                  <option value="LA">マンガ・アニメーション科四年制</option>
                  <option value="AN">マンガ・アニメーション科</option>
                </optgroup>

                <optgroup label="デザインカレッジ">
                  <option value="L4">ゲームクリエイター科四年制</option>
                  <option value="GM">ゲームクリエイター科</option>
                  <option value="CG">CG映像科</option>
                  <option value="G2">デザイン科</option>
                </optgroup>

                <optgroup label="ミュージックカレッジ">
                  <option value="R2">ミュージックアーティスト科</option>
                  <option value="F2">コンサート・イベント科</option>
                  <option value="M2">音響芸術科</option>
                </optgroup>

                <optgroup label="ITカレッジ">
                  <option value="IS">ITスペシャリスト科</option>
                  <option value="AI">AIシステム科</option>
                  <option value="C2">情報処理科</option>
                  <option value="PN">ネットワークセキュリティ科</option>
                  <option value="L2">情報ビジネス科</option>
                </optgroup>

                <optgroup label="テクノロジーカレッジ">
                  <option value="AR">ロボット科</option>
                  <option value="E2">電子・電気科</option>
                  <option value="EV">一級自動車整備科</option>
                  <option value="RV">自動車整備科</option>
                  <option value="BN">応用生物学科</option>
                  <option value="X4">建築科</option>
                  <option value="X2">建築設計科</option>
                  <option value="YZ">土木・造園科</option>
                  <option value="DC">機械設計科</option>
                </optgroup>

                <optgroup label="スポート・医療カレッジ">
                  <option value="N3">スポーツトレーナー科三年制</option>
                  <option value="NA">スポーツトレーナー科</option>
                  <option value="NE">スポーツ健康学科三年制</option>
                  <option value="N2">スポーツ健康学科</option>
                  <option value="S3">鍼灸科</option>
                  <option value="J3">柔道整復科</option>
                  <option value="MI">医療事務科</option>
                </optgroup>
              </Select>
            </Flex>
            <Flex className="flex-center">
              <FontAwesomeIcon className="secondary-color" icon={faUser} fontSize={25}></FontAwesomeIcon>
            </Flex>
            <Flex pl={resp(6, 12, 12)} alignItems="center">
              <Text className="kb" fontSize={resp("1.5rem", "1.8rem", "1.9rem")}>ユーザー属性を選択</Text>
            </Flex>
            <Flex className="flex-center">
              <Box className="secondary-color" h="64px" borderLeft="dotted 4px"></Box>
            </Flex>
            <Flex pl={resp("2.5rem", "4.2rem", "4.3rem")} py={5} alignItems="center">
              <RadioGroup onChange={setUserAttribute} value={userAttribute}>
                <Stack direction="row">
                  <Radio className="kr" value="cast">キャスト</Radio>
                  <Radio className="kr" value="manager">運営チーム</Radio>
                </Stack>
              </RadioGroup>
            </Flex>
            <Flex className="flex-center">
              <FontAwesomeIcon className="secondary-color" icon={faCheck} fontSize={25}></FontAwesomeIcon>
            </Flex>
            <Flex pl={resp(6, 12, 12)} alignItems="center">
              <Text className="kb" fontSize={resp("1.5rem", "1.8rem", "1.9rem")}>追加</Text>
            </Flex>
            <Flex className="flex-center">
              <Box className="secondary-color" h="74px" borderLeft="dotted 4px"></Box>
            </Flex>
            <Flex className="flex-center" pt="2rem">
              <SendButton text="ユーザーを追加"></SendButton>
            </Flex>
          </Grid>
        </Flex>
      } />
    </>
  )
}

export default AddApprovedUser