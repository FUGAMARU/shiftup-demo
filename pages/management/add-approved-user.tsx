// Next.js
import { NextPage, InferGetStaticPropsType } from "next"
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

// Filter
import { withSession } from "../../hoc/withSession"

// Importing Symbols
import * as fs from "fs"
import * as path from "path"
type Symbols = { [key: string]: string }
type Props = InferGetStaticPropsType<typeof getStaticProps>

export const getStaticProps = async () => {
  const jsonPath = path.join(process.cwd(), "public", "symbols.json")
  const jsonText = fs.readFileSync(jsonPath, "utf-8")
  const symbols = JSON.parse(jsonText) as Symbols

  return {
    props: { symbols: symbols }
  }
}

const AddApprovedUser: NextPage<Props> = ({ symbols }) => {
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
                {Object.keys(symbols).map((label, idx) => {
                  return (
                    <optgroup label={label} key={idx}>
                      {Object.keys(symbols[label]).map((subKey, subIdx) => {
                        return (
                          <option value={subKey} key={idx + subIdx}>{Object.values(symbols[label])[subIdx]}</option>
                        )
                      })}
                    </optgroup>
                  )
                })}
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
        </Flex >
      } />
    </>
  )
}

export default withSession(AddApprovedUser)