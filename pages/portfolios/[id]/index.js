import React from 'react'
import MediaCards from './MediaCards';
import ContactCards from './ContactCards';
import SkillsCards from './SkillsCards';
import InterestCards from './InterestCards';
import PreviousIndustryCards from './PreviousIndustryCards';
import VideoCards from './VideoCards';
import {Grid, Paper, Typography} from '@mui/material'
import Box from '@mui/material/Box';

const mediaCards = [
  {
    // image: '/img/Kodai-temple.jpg',
    title: 'First and Last Name',
    description: `Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur`,
  }
]

const contactCards = [
  {
    firstname: '',
    lastname: '',
    pronouns: '',
    techStack: '',
    socialMedia: {
      email: '',
      github: '',
      twitter: '',
      facebook: '',
    },
    description: ``,
  }
]

const videoCards = [
  {
    video: '',
    description: '',
  }
]

const skillsCards = [
  {
    video: '',
    description: '',
  }
]

const interestCards = [
  {
    video: '',
    description: '',
  }
]

const previousIndustryCards = [
  {
    video: '',
    description: '',
  }
]

function Cards() {
  return (
    <Box p={2}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography>Logo</Typography>
      </Grid>

        {contactCards.map((contactCard, i) => {
          return (
            <>
              <Grid key={i} item>
                <ContactCards {...contactCard} />
              </Grid>
            </>
          );
        })}
        
        {mediaCards.map((mediaCard, i) => {
          return (
            <>
              <Grid key={i} item>
                <MediaCards {...mediaCard} />
              </Grid>
            </>
          );
        })}

        {/* {videoCards.map((videoCard, i) => {
          return (
            <>
              <Grid key={i} item>
                <VideoCards {...videoCard} />
              </Grid>
            </>
          );
        })}  */}

        {skillsCards.map((skillsCard, i) => {
          return (
            <>
              <Grid key={i} item>
                <SkillsCards {...skillsCard} />
              </Grid>
            </>
          );
        })} 

        {previousIndustryCards.map((previousIndustryCard, i) => {
          return (
            <>
              <Grid key={i} item>
                <PreviousIndustryCards {...previousIndustryCard} />
              </Grid>
            </>
          );
        })}   

        {/* {interestCards.map((interestCard, i) => {
          return (
            <>
              <Grid key={i} item>
                <InterestCards {...interestCard} />
              </Grid>
            </>
          );
        })} */}
      </Grid>
    </Box>
  );
}

export default Cards;