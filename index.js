const Discord = require('discord.js');
const client = new Discord.Client();
const token = process.argv.length == 2 ? process.env.token : "";
const moment = require("moment");
require("moment-duration-format");
const welcomeChannelName = "➕ㅣ입국";
const byeChannelName = "➖ㅣ출국";
const welcomeChannelComment = "님이 입장하셨습니다.";
const byeChannelComment = "님이 출국하셨습니다.";

client.on('ready', () => {
  console.log('켰다.');
  client.user.setPresence({ game: { name: 'made by ! 𝑻𝒆𝒓𝒆𝒔𝒂#6974' }, status: 'online' })
});

client.on("guildMemberAdd", (member) => {
  const guild = member.guild;
  const newUser = member.user;
  const welcomeChannel = guild.channels.find(channel => channel.name == welcomeChannelName);

  welcomeChannel.send(`<@${newUser.id}> ${welcomeChannelComment}\n`);

  member.addRole(guild.roles.find(role => role.name == "유저"));
});

client.on("guildMemberRemove", (member) => {
  const guild = member.guild;
  const deleteUser = member.user;
  const byeChannel = guild.channels.find(channel => channel.name == byeChannelName);

  byeChannel.send(`<@${deleteUser.id}> ${byeChannelComment}\n`);
});

client.on('message', (message) => {
  if(message.author.bot) return;

  if(message.content == '-북극곰') {
    return message.reply('무요');
  }

  if(message.content == '-디스코드') {
    let embed = new Discord.RichEmbed()
    let img = 'https://cdn.discordapp.com/attachments/763396607793692725/788750039220617216/1c51174113104005.jpg';
    var duration = moment.duration(client.uptime).format(" D [일], H [시간], m [분], s [초]");
    embed.setColor('#186de6')
    embed.setAuthor('디스코드 현황', img)
    embed.setFooter(`made by 𝑻𝒆𝒓𝒆𝒔𝒂 ❤️`)
    embed.addBlankField()
    embed.addField('RAM',    `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`, true);
    embed.addField('Up time', `${duration}`, true);
    embed.addField('유저',         `${client.users.size.toLocaleString()}`, true);
    embed.addField('서버',       `${client.guilds.size.toLocaleString()}`, true);
    // embed.addField('channel',      `${client.channels.size.toLocaleString()}`, true);
    embed.addField('Discord',   `v${Discord.version}`, true);
    embed.addField('Node',         `${process.version}`, true);
    
    let arr = client.guilds.array();
    let list = '';
    list = `\`\`\`css\n`;
    
    for(let i=0;i<arr.length;i++) {
      // list += `${arr[i].name} - ${arr[i].id}\n`
      list += `${arr[i].name}\n`
    }
    list += `\`\`\`\n`
    embed.addField('list:',        `${list}`);

    embed.setTimestamp()
    message.channel.send(embed);
  }

  if(message.content == '-관리자') {
    let img = 'https://cdn.discordapp.com/attachments/763396607793692725/764437000354267146/common.png';
    let embed = new Discord.RichEmbed()
      .setTitle('관리자 소개')
      .setURL('http://www.naver.com')
      .setAuthor('Cozy World', img, 'http://www.naver.com')
      .setThumbnail(img)
      .addBlankField()
      .addField('총 관리자', '!cozy#6968')
      .addField('관리자', '늘봄#3333\n경히#1824\n', true)
      .addField('인게임 관리자', '𝑹𝒆𝒐#3193\n김창희#3678\n머랭쿠키#1004\n')
      .addField('디스코드 관리자', '𝑻𝒆𝒓𝒆𝒔𝒂#6974\n뭘꼬나봐#1594\n')
      .addBlankField()
      .setTimestamp()
      .setFooter('made by 𝑻𝒆𝒓𝒆𝒔𝒂', img)

    message.channel.send(embed)
  } else if(message.content == '-도움말') {
    let helpImg = 'https://cdn.discordapp.com/attachments/763396607793692725/788750039220617216/1c51174113104005.jpg';
    let commandList = [
      {name: '-도움말', desc: '도움말'},
      {name: '-디스코드', desc: '현재 디스코드 상태'},
      {name: '-공지', desc: 'dm으로 embed 형식으로 공지 보내기'},
      {name: '-청소', desc: '채탕 청소하기'},
      {name: '-초대코드', desc: '해당 채널의 초대 코드 표기'},
    ];
    let commandStr = '';
    let embed = new Discord.RichEmbed()
      .setAuthor('북극곰 도움말', helpImg)
      .setColor('#186de6')
      .setFooter(`made by 𝑻𝒆𝒓𝒆𝒔𝒂 ❤️`)
      .setTimestamp()
    
    commandList.forEach(x => {
      commandStr += `• \`\`${changeCommandStringLength(`${x.name}`)}\`\` : **${x.desc}**\n`;
    });

    embed.addField('Commands: ', commandStr);

    message.channel.send(embed)
  } else if(message.content == '-초대코드2') {
    client.guilds.array().forEach(x => {
      x.channels.find(x => x.type == 'text').createInvite({maxAge: 0}) // maxAge: 0은 무한이라는 의미, maxAge부분을 지우면 24시간으로 설정됨
        .then(invite => {
          message.channel.send(invite.url)
        })
        .catch((err) => {
          if(err.code == 50013) {
            message.channel.send('**'+x.channels.find(x => x.type == 'text').guild.name+'** 채널 권한이 없어 초대코드 발행 실패')
          }
        })
    });
  } else if(message.content == '-초대코드') {
    if(message.channel.type == 'dm') {
      return message.reply('dm에서 사용할 수 없는 명령어 입니다.');
    }
    message.guild.channels.get(message.channel.id).createInvite({maxAge: 0}) // maxAge: 0은 무한이라는 의미, maxAge부분을 지우면 24시간으로 설정됨
      .then(invite => {
        message.channel.send(invite.url)
      })
      .catch((err) => {
        if(err.code == 50013) {
          message.channel.send('**'+message.guild.channels.get(message.channel.id).guild.name+'** 채널 권한이 없어 초대코드 발행 실패')
        }
      })
  } else if(message.content.startsWith('-공지')) {
    if(checkPermission(message)) return
    if(message.member != null) { // 채널에서 공지 쓸 때
      let contents = message.content.slice('-공지'.length);
      let embed = new Discord.RichEmbed()
        .setAuthor('북극곰 공지')
        .setColor('#186de6')
        .setFooter(`made by 𝑻𝒆𝒓𝒆𝒔𝒂 ❤️`)
        .setTimestamp()
  
      embed.addField('내용: ', contents);
  
      message.member.guild.members.array().forEach(x => {
        if(x.user.bot) return;
        x.user.send(embed)
      });
  

      return message.reply('공지를 전송했습니다.');
    } else {
      return message.reply('채널에서 실행해주세요.');
    }
  } else if(message.content.startsWith('-청소')) {
    if(message.channel.type == 'dm') {
      return message.reply('dm에서 사용할 수 없는 명령어 입니다.');
    }
    
    if(message.channel.type != 'dm' && checkPermission(message)) return

    var clearLine = message.content.slice('-청소 '.length);
    var isNum = !isNaN(clearLine)

    if(isNum && (clearLine <= 0 || 100 < clearLine)) {
      message.channel.send("1부터 100까지의 숫자만 입력해주세요.")
      return;
    } else if(!isNum) { // c @나긋해 3
      if(message.content.split('<@').length == 2) {
        if(isNaN(message.content.split(' ')[2])) return;

        var user = message.content.split(' ')[1].split('<@!')[1].split('>')[0];
        var count = parseInt(message.content.split(' ')[2])+1;
        let _cnt = 0;

        message.channel.fetchMessages().then(collected => {
          collected.every(msg => {
            if(msg.author.id == user) {
              msg.delete();
              ++_cnt;
            }
            return !(_cnt == count);
          });
        });
      }
    } else {
      message.channel.bulkDelete(parseInt(clearLine)+1)
        .then(() => {
          AutoMsgDelete(message, `<@${message.author.id}> ` + parseInt(clearLine) + "개의 메시지를 삭제했습니다. (이 메세지는 잠시 후에 사라집니다.)");
        })
        .catch(console.error)
    }
  }
});

function checkPermission(message) {
  if(!message.member.hasPermission("MANAGE_MESSAGES")) {
    message.channel.send(`<@${message.author.id}> ` + "명령어를 수행할 관리자 권한을 소지하고 있지않습니다.")
    return true;
  } else {
    return false;
  }
}

function changeCommandStringLength(str, limitLen = 8) {
  let tmp = str;
  limitLen -= tmp.length;

  for(let i=0;i<limitLen;i++) {
      tmp += ' ';
  }

  return tmp;
}

async function AutoMsgDelete(message, str, delay = 3000) {
  let msg = await message.channel.send(str);

  setTimeout(() => {
    msg.delete();
  }, delay);
}

client.on("message", async message =>
{
if (message.content.startsWith("시발","개새끼","병신","무요")) {
message.delete();
message.channel.send("욕하지마 개새끼야")
}
});

const request = require("-코로나")


let url = "https://apiv2.corona-live.com/stats.json"
request(url, (error, response, body) => {
    let overview = JSON.parse(response.body).overview;
    overview = {
        total_confirmed_person: overview.confirmed[0], // 총 확진자수
        yesterday_confirmed_person: overview.confirmed[1], // 어제 확진자수

        current_confirmed_person: overview.current[0], // 현재 확진자수
        current_confirmed_person_diff: overview.current[1], // diff(어제 이 시간대 확진자 수 - 현재 이 시간대 확진자 수)
    }

    let current = JSON.parse(response.body).current;
    current = {
        seoul_confirmed_person: current[0].cases[0], // 서울 현재 확진자 수
        seoul_confirmed_person_diff: current[0].cases[1], // 서울 diff(어제 이 시간대 확진자 수 - 현재 이 시간대 확진자 수)

        busan_confirmed_person: current[1].cases[0],//부산 현재 확진자 수
        busan_confirmed_person_diff: current[1].cases[1],//부산 diff(어제 이 시간대 확진자 수 - 현재 이 시간대 확진자 수)

        incheon_confirmed_person: current[2].cases[0],//인천 현재 확진자 수
        incheon_confirmed_person_diff: current[2].cases[1],//인천 diff(어제 이 시간대 확진자 수 - 현재 이 시간대 확진자 수)

        daegu_confirmed_person: current[3].cases[0],//대구 현재 확진자 수
        daegu_confirmed_person_diff: current[3].cases[1],//대구 diff(어제 이 시간대 확진자 수 - 현재 이 시간대 확진자 수)

        gwangju_confirmed_person: current[4].cases[0],//광주 현재 확진자 수
        gwangju_confirmed_person_diff: current[4].cases[1],//광주 diff(어제 이 시간대 확진자 수 - 현재 이 시간대 확진자 수)

        daejeon_confirmed_person: current[5].cases[0],//대전 현재 확진자 수
        daejeon_confirmed_person_diff: current[5].cases[1],//대전 diff(어제 이 시간대 확진자 수 - 현재 이 시간대 확진자 수)

        ulsan_confirmed_person: current[6].cases[0],//울산 현재 확진자 수
        ulsan_confirmed_person_diff: current[6].cases[1],//울산 diff(어제 이 시간대 확진자 수 - 현재 이 시간대 확진자 수)

        sejong_confirmed_person: current[7].cases[0],//세종 현재 확진자 수
        sejong_confirmed_person_diff: current[7].cases[1],//세종 diff(어제 이 시간대 확진자 수 - 현재 이 시간대 확진자 수)

        gyeonggi_confirmed_person: current[8].cases[0],//경기 현재 확진자 수
        gyeonggi_confirmed_person_diff: current[8].cases[1],//경기 diff(어제 이 시간대 확진자 수 - 현재 이 시간대 확진자 수)

        gangwon_confirmed_person: current[9 ].cases[0],//강원 현재 확진자 수
        gangwon_confirmed_person_diff: current[9].cases[1],//강원 diff(어제 이 시간대 확진자 수 - 현재 이 시간대 확진자 수)
        
        chungbuk_confirmed_person: current[10].cases[0],//충북 현재 확진자 수
        chungbuk_confirmed_person_diff: current[10].cases[1],//충북 diff(어제 이 시간대 확진자 수 - 현재 이 시간대 확진자 수)
        
        chungnam_confirmed_person: current[11].cases[0],//충남 현재 확진자 수
        chungnam_confirmed_person_diff: current[11].cases[1],//충남 diff(어제 이 시간대 확진자 수 - 현재 이 시간대 확진자 수)
        
        gyeongbuk_confirmed_person: current[12].cases[0],//경북 현재 확진자 수
        gyeongbuk_confirmed_person_diff: current[12].cases[1],//경북 diff(어제 이 시간대 확진자 수 - 현재 이 시간대 확진자 수)
        
        gyeongnam_confirmed_person: current[13].cases[0],//경남 현재 확진자 수
        gyeongnam_confirmed_person_diff: current[13].cases[1],//경남 diff(어제 이 시간대 확진자 수 - 현재 이 시간대 확진자 수)
        
        jeonbuk_confirmed_person: current[14].cases[0],//전북 현재 확진자 수
        jeonbuk_confirmed_person_diff: current[14].cases[1],//전북 diff(어제 이 시간대 확진자 수 - 현재 이 시간대 확진자 수)
        
        jeonnam_confirmed_person: current[15].cases[0],//전남 현재 확진자 수
        jeonnam_confirmed_person_diff: current[15].cases[1],//전남 diff(어제 이 시간대 확진자 수 - 현재 이 시간대 확진자 수)
        
        jeju_confirmed_person: current[16].cases[0],//제주 현재 확진자 수
        jeju_confirmed_person_diff: current[16].cases[1],//제주 diff(어제 이 시간대 확진자 수 - 현재 이 시간대 확진자 수)
    }

    let overall = JSON.parse(response.body).overall;
    overall = {
        seoul_total_confirmed_person: overall[0].cases[0], // 서울 총 확진자수
        seoul_yesterday_confirmed_person: overall[0].cases[1], // 서울 어제 확진자수

        busan_total_confirmed_person: overall[1].cases[0], // 부산 총 확진자수
        busan_yesterday_confirmed_person: overall[1].cases[1], // 부산 어제 확진자수

        incheon_total_confirmed_person: overall[2].cases[0], // 인천 총 확진자수
        incheon_yesterday_confirmed_person: overall[2].cases[1], // 인천 어제 확진자수

        daegu_total_confirmed_person: overall[3].cases[0], // 대구 총 확진자수
        daegu_yesterday_confirmed_person: overall[3].cases[1], // 대구 어제 확진자수
        gwangju_total_confirmed_person: overall[4].cases[0], // 광주 총 확진자수
        gwangju_yesterday_confirmed_person: overall[4].cases[1], // 광주 어제 확진자수

        daejeon_total_confirmed_person: overall[5].cases[0], // 대전 총 확진자수
        daejeon_yesterday_confirmed_person: overall[5].cases[1], // 대전 어제 확진자수

        ulsan_total_confirmed_person: overall[6].cases[0], // 울산 총 확진자수
        ulsan_yesterday_confirmed_person: overall[6].cases[1], // 울산 어제 확진자수

        sejong_total_confirmed_person: overall[7].cases[0], // 세종 총 확진자수
        sejong_yesterday_confirmed_person: overall[7].cases[1], // 세종 어제 확진자수

        gyeonggi_total_confirmed_person: overall[8].cases[0], // 경기 총 확진자수
        gyeonggi_yesterday_confirmed_person: overall[8].cases[1], // 경기 어제 확진자수
        
        gangwon_total_confirmed_person: overall[9].cases[0], // 강원 총 확진자수
        gangwon_yesterday_confirmed_person: overall[9].cases[1], // 강원 어제 확진자수
        
        chungbuk_total_confirmed_person: overall[10].cases[0], // 충북 총 확진자수
        chungbuk_yesterday_confirmed_person: overall[10].cases[1], // 충북 어제 확진자수
        
        chungnam_total_confirmed_person: overall[11].cases[0], // 충남 총 확진자수
        chungnam_yesterday_confirmed_person: overall[11].cases[1], // 충남 어제 확진자수
        
        gyeongbuk_total_confirmed_person: overall[12].cases[0], // 경북 총 확진자수
        gyeongbuk_yesterday_confirmed_person: overall[12].cases[1], // 경북 어제 확진자수
        
        gyeongnam_total_confirmed_person: overall[13].cases[0], // 경남 총 확진자수
        gyeongnam_yesterday_confirmed_person: overall[13].cases[1], // 경남 어제 확진자수
        
        jeonbuk_total_confirmed_person: overall[14].cases[0], // 전북 총 확진자수
        jeonbuk_yesterday_confirmed_person: overall[14].cases[1], // 전북 어제 확진자수
        
        jeonnam_total_confirmed_person: overall[15].cases[0], // 전남 총 확진자수
        jeonnam_yesterday_confirmed_person: overall[15].cases[1], // 전남 어제 확진자수
        
        jeju_total_confirmed_person: overall[16].cases[0], // 제주 총 확진자수
        jeju_yesterday_confirmed_person: overall[16].cases[1], // 제주 어제 확진자수
    }

    let embed = new Discord.MessageEmbed()
    embed.setTitle('코로나')
    embed.setURL('https://corona-live.com')
    embed.setColor('#FF8000')
    embed.setDescription('증상이 있으실 경우 주변 접촉자에게 알리신 후 인근 보건소를 찾아주시기 바랍니다')
    embed.addField(`대한민국 총 확진자수`, `${overview.total_confirmed_person}명`, true)
    embed.addField(`어제 확진자수`, overview.yesterday_confirmed_person + `명`, true)
    embed.addField(`오늘 확진자수(집계중)`, overview.current_confirmed_person + `명`, true)
    embed.addField(`오늘 어제지금시간   -   현재지금시간의 확진자`, overview.current_confirmed_person_diff + `명`, true)
    embed.addField(`--------------------------------------------------------------------------------------------------`, 'ㅤ')
    embed.addField(`서울`, 'ㅤ')
    embed.addField(`서울 총 확진자수`,  overall.seoul_total_confirmed_person + `명`, true)
    embed.addField(`서울 어제 확진자수`, overall.seoul_yesterday_confirmed_person + `명`, true)
    embed.addField(`서울 오늘 확진자 수(집계중)`, current.seoul_confirmed_person + `명`, true)
    embed.addField(`서울 어제지금시간   -   현재지금시간의 확진자`, current.seoul_confirmed_person_diff,true)
    embed.addField(`--------------------------------------------------------------------------------------------------`, 'ㅤ')
    embed.addField(`부산` ,'ㅤ')
    embed.addField(`부산 총 확진자수`,  overall.busan_total_confirmed_person + `명`, true)
    embed.addField(`부산 어제 확진자수`, overall.busan_yesterday_confirmed_person + `명`, true)
    embed.addField(`부산 현재 확진자 수(집계중)`, current.busan_confirmed_person + `명`, true)
    embed.addField(`부산 어제지금시간   -   현재지금시간의 확진자`, current.busan_confirmed_person_diff + `명`,true)
    embed.addField(`--------------------------------------------------------------------------------------------------`, 'ㅤ')
    embed.addField(`대구` ,'ㅤ')
    embed.addField(`대구 총 확진자수`,  overall.daegu_total_confirmed_person + `명`, true)
    embed.addField(`대구 어제 확진자수`, overall.daegu_yesterday_confirmed_person + `명`, true)
    embed.addField(`대구 현재 확진자 수(집계중)`, current.daegu_confirmed_person + `명`, true)
    embed.addField(`대구 어제지금시간   -   현재지금시간의 확진자`, current.daegu_confirmed_person_diff + `명`,true)
    embed.addField(`--------------------------------------------------------------------------------------------------`, 'ㅤ')
    let embed2 = new Discord.MessageEmbed()
    embed2.setColor('#FF8000')
    embed2.addField(`광주` ,'ㅤ')
    embed2.addField(`광주 총 확진자수`,  overall.gwangju_total_confirmed_person + `명`, true)
    embed2.addField(`광주 어제 확진자수`, overall.gwangju_yesterday_confirmed_person + `명`, true)
    embed2.addField(`광주 현재 확진자 수(집계중)`, current.gwangju_confirmed_person + `명`, true)
    embed2.addField(`광주 어제지금시간   -   현재지금시간의 확진자`, current.gwangju_confirmed_person_diff + `명`,true)
    embed2.addField(`--------------------------------------------------------------------------------------------------`, 'ㅤ')
    embed2.addField(`대전` ,'ㅤ')
    embed2.addField(`대전 총 확진자수`,  overall.daejeon_total_confirmed_person + `명`, true)
    embed2.addField(`대전 어제 확진자수`, overall.daejeon_yesterday_confirmed_person + `명`, true)
    embed2.addField(`대전 현재 확진자 수(집계중)`, current.daejeon_confirmed_person + `명`, true)
    embed2.addField(`대전 어제지금시간   -   현재지금시간의 확진자`, current.daejeon_confirmed_person_diff + `명`,true)
    embed2.addField(`--------------------------------------------------------------------------------------------------`, 'ㅤ')
    embed2.addField(`울산` ,'ㅤ')
    embed2.addField(`울산 총 확진자수`,  overall.ulsan_total_confirmed_person + `명`, true)
    embed2.addField(`울산 어제 확진자수`, overall.ulsan_yesterday_confirmed_person + `명`, true)
    embed2.addField(`울산 현재 확진자 수(집계중)`, current.ulsan_confirmed_person + `명`, true)
    embed2.addField(`울산 어제지금시간   -   현재지금시간의 확진자`, current.ulsan_confirmed_person_diff + `명`,true)
    embed2.addField(`--------------------------------------------------------------------------------------------------`, 'ㅤ')
    embed2.addField(`세종` ,'ㅤ')
    embed2.addField(`세종 총 확진자수`,  overall.sejong_total_confirmed_person + `명`, true)
    embed2.addField(`세종 어제 확진자수`, overall.sejong_yesterday_confirmed_person + `명`, true)
    embed2.addField(`세종 현재 확진자 수(집계중)`, current.sejong_confirmed_person + `명`, true)
    embed2.addField(`세종 어제지금시간   -   현재지금시간의 확진자`, current.sejong_confirmed_person_diff + `명`,true)
    embed2.addField(`--------------------------------------------------------------------------------------------------`, 'ㅤ')
    let embed3 = new Discord.MessageEmbed()
    embed3.setColor('#FF8000')
    embed3.addField(`경기` ,'ㅤ')
    embed3.addField(`경기 총 확진자수`,  overall.gyeonggi_total_confirmed_person + `명`, true)
    embed3.addField(`경기 어제 확진자수`, overall.gyeonggi_yesterday_confirmed_person + `명`, true)
    embed3.addField(`경기 현재 확진자 수(집계중)`, current.gyeonggi_confirmed_person + `명`, true)
    embed3.addField(`경기 어제  지금시간   -   현재지금시간의 확진자`, current.gyeonggi_confirmed_person_diff + `명`,true)
    embed3.addField(`--------------------------------------------------------------------------------------------------`, 'ㅤ')
    embed3.addField(`강원` ,'ㅤ')
    embed3.addField(`강원 총 확진자수`,  overall.gangwon_total_confirmed_person + `명`, true)
    embed3.addField(`강원 어제 확진자수`, overall.gangwon_yesterday_confirmed_person + `명`, true)
    embed3.addField(`강원 현재 확진자 수(집계중)`, current.gangwon_confirmed_person + `명`, true)
    embed3.addField(`강원 어제  지금시간   -   현재지금시간의 확진자`, current.gangwon_confirmed_person_diff + `명`,true)
    embed3.addField(`--------------------------------------------------------------------------------------------------`, 'ㅤ')
    embed3.addField(`충북` ,'ㅤ')
    embed3.addField(`충북 총 확진자수`,  overall.chungbuk_total_confirmed_person + `명`, true)
    embed3.addField(`충북 어제 확진자수`, overall.chungbuk_yesterday_confirmed_person + `명`, true)
    embed3.addField(`충북 현재 확진자 수(집계중)`, current.chungbuk_confirmed_person + `명`, true)
    embed3.addField(`충북 어제  지금시간   -   현재지금시간의 확진자`, current.chungbuk_confirmed_person_diff + `명`,true)
    embed3.addField(`--------------------------------------------------------------------------------------------------`, 'ㅤ')
    embed3.addField(`충남` ,'ㅤ')
    embed3.addField(`충남 총 확진자수`,  overall.chungnam_total_confirmed_person + `명`, true)
    embed3.addField(`충남 어제 확진자수`, overall.chungnam_yesterday_confirmed_person + `명`, true)
    embed3.addField(`충남 현재 확진자 수(집계중)`, current.chungnam_confirmed_person + `명`, true)
    embed3.addField(`충남 어제  지금시간   -   현재지금시간의 확진자`, current.chungnam_confirmed_person_diff + `명`,true)
    embed3.addField(`--------------------------------------------------------------------------------------------------`, 'ㅤ')
    let embed4 = new Discord.MessageEmbed()
    embed4.setColor('#FF8000')
    embed4.addField(`경북` ,'ㅤ')
    embed4.addField(`경북 총 확진자수`,  overall.gyeongbuk_total_confirmed_person + `명`, true)
    embed4.addField(`경북 어제 확진자수`, overall.gyeongbuk_yesterday_confirmed_person + `명`, true)
    embed4.addField(`경북 현재 확진자 수(집계중)`, current.gyeongbuk_confirmed_person + `명`, true)
    embed4.addField(`경북 어제  지금시간   -   현재지금시간의 확진자`, current.gyeongbuk_confirmed_person_diff + `명`,true)
    embed4.addField(`--------------------------------------------------------------------------------------------------`, 'ㅤ')
    embed4.addField(`경남` ,'ㅤ')
    embed4.addField(`경남 총 확진자수`,  overall.gyeongnam_total_confirmed_person + `명`, true)
    embed4.addField(`경남 어제 확진자수`, overall.gyeongnam_yesterday_confirmed_person + `명`, true)
    embed4.addField(`경남 현재 확진자 수(집계중)`, current.gyeongnam_confirmed_person + `명`, true)
    embed4.addField(`경남 어제  지금시간   -   현재지금시간의 확진자`, current.gyeongnam_confirmed_person_diff + `명`,true)
    embed4.addField(`--------------------------------------------------------------------------------------------------`, 'ㅤ')
    embed4.addField(`전북` ,'ㅤ')
    embed4.addField(`전북 총 확진자수`,  overall.jeonbuk_total_confirmed_person + `명`, true)
    embed4.addField(`전북 어제 확진자수`, overall.jeonbuk_yesterday_confirmed_person + `명`, true)
    embed4.addField(`전북 현재 확진자 수(집계중)`, current.jeonbuk_confirmed_person + `명`, true)
    embed4.addField(`전북 어제  지금시간   -   현재지금시간의 확진자`, current.jeonbuk_confirmed_person_diff + `명`,true)
    embed4.addField(`--------------------------------------------------------------------------------------------------`, 'ㅤ')
    embed4.addField(`전남` ,'ㅤ')
    embed4.addField(`전남 총 확진자수`,  overall.jeonnam_total_confirmed_person + `명`, true)
    embed4.addField(`전남 어제 확진자수`, overall.jeonnam_yesterday_confirmed_person + `명`, true)
    embed4.addField(`전남 현재 확진자 수(집계중)`, current.jeonnam_confirmed_person + `명`, true)
    embed4.addField(`전남 어제  지금시간   -   현재지금시간의 확진자`, current.jeonnam_confirmed_person_diff + `명`,true)
    embed4.addField(`--------------------------------------------------------------------------------------------------`, 'ㅤ')
    let embed5 = new Discord.MessageEmbed()
    embed5.setColor(`#FF8000`)
    embed5.addField(`제주` ,'ㅤ')
    embed5.addField(`제주 총 확진자수`,  overall.jeju_total_confirmed_person + `명`, true)
    embed5.addField(`제주 어제 확진자수`, overall.jeju_yesterday_confirmed_person + `명`, true)
    embed5.addField(`제주 현재 확진자 수(집계중)`, current.jeju_confirmed_person + `명`, true)
    embed5.addField(`제주 어제  지금시간   -   현재지금시간의 확진자`, current.jeju_confirmed_person_diff + `명`,true)
    message.channel.send(embed)
    message.channel.send(embed2)
    message.channel.send(embed3)
    message.channel.send(embed4)
    message.channel.send(embed5)
})

client.login(token);
