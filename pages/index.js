import { useState, useEffect } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import {
  Card,
  TextField,
  Button,
  Flex,
  Heading,
  Table,
  TableCell,
  TableBody,
  TableHead,
  TableRow,
  View,
  withAuthenticator,
} from '@aws-amplify/ui-react'
import { API } from 'aws-amplify'
import { listMessages } from '../src/graphql/queries'
import { setFutureMessage, createMessage } from '../src/graphql/mutations'

const Home = ({ user, signOut }) => {
  const [startDate, setStartDate] = useState(new Date())
  const [message, setMessage] = useState('')
  const [buttonDisabled, setButtonDisabled] = useState(false)
  const [sentMessages, setSentMessages] = useState([])

  useEffect(() => {
    const fetchMessages = async () => await API.graphql({ query: listMessages })
    fetchMessages().then(({ data: { listMessages } }) => {
      const sortedMessages = listMessages.items.sort((a, b) => {
        return a.ttl - b.ttl
      })
      setSentMessages(sortedMessages)
    })
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setButtonDisabled(true)

    const messageParams = {
      message: message,
      recipientPhoneNumber: user.attributes.phone_number,
      waitTimestamp: startDate.toISOString(),
    }

    try {
      await API.graphql({
        query: setFutureMessage,
        variables: {
          futureMessageInput: messageParams,
        },
      })
      const { data } = await API.graphql({
        query: createMessage,
        variables: {
          input: {
            ...messageParams,
            ttl: Math.floor(new Date(startDate).valueOf() / 1000),
          },
        },
      })
      setSentMessages((currMessages) => [...currMessages, data.createMessage])
    } catch (e) {
      console.log('uh oh, something went wrong', e)
    }

    setButtonDisabled(false)
    setMessage('')
  }
  return (
    <>
      <Flex direction="column">
        <Button
          style={{ margin: '1rem' }}
          onClick={signOut}
          alignSelf={'flex-end'}
        >
          Sign Out
        </Button>
        <Heading
          textAlign={'center'}
          level={3}
          style={{ marginBottom: '4rem' }}
        >
          Send a text to your future self 🔮
        </Heading>
        <Flex
          alignSelf={'center'}
          justifyContent={'space-between'}
          wrap={'wrap'}
        >
          <Card variation="elevated">
            <form onSubmit={handleSubmit}>
              <TextField
                style={{ marginBottom: '1rem' }}
                placeholder="take dogs for a walk"
                label="Message:"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <DatePicker
                inline
                selected={startDate}
                timeIntervals={15}
                showTimeSelect
                onChange={(date) => setStartDate(date)}
              />

              <Button
                type="submit"
                disabled={buttonDisabled}
                variation="primary"
                style={{ marginTop: '1rem' }}
              >
                Submit
              </Button>
            </form>
          </Card>

          <View>
            <Heading
              textAlign="center"
              level={4}
              style={{ marginBottom: '1.5rem' }}
            >
              Pending Messages
            </Heading>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell as="th">Message</TableCell>
                  <TableCell as="th">Recipient Phone Number</TableCell>
                  <TableCell as="th">Delivery Time</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sentMessages.map((sentMessage) => (
                  <TableRow key={sentMessage.id}>
                    <TableCell>{sentMessage.message}</TableCell>
                    <TableCell>{sentMessage.recipientPhoneNumber}</TableCell>
                    <TableCell>
                      {new Date(sentMessage.waitTimestamp).toLocaleDateString()}{' '}
                      at{' '}
                      {new Date(sentMessage.waitTimestamp).toLocaleTimeString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </View>
        </Flex>
      </Flex>
    </>
  )
}

// TODO: Update when auth in configured
// export default Home
export default withAuthenticator(Home)
