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

  if(message.content == '-시댕봇') {
    return message.reply('무요');
  }

  if(message.content == '-디스코드') {
    let embed = new Discord.RichEmbed()
    let img = 'https://cdn.discordapp.com/attachments/763396607793692725/764437000354267146/common.png';
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
    let helpImg = 'https://cdn.discordapp.com/attachments/763396607793692725/764437000354267146/common.png';
    let commandList = [
      {name: '-도움말', desc: '도움말'},
      {name: '-디스코드', desc: '현재 디스코드 상태'},
      {name: '-공지', desc: 'dm으로  공지 보내기'},
      {name: '-공지2', desc: 'dm으로 embed 형식으로 공지 보내기'},
      {name: '-청소', desc: '채탕 청소하기'},
      {name: '-초대코드', desc: '해당 채널의 초대 코드 표기'},
    ];
    let commandStr = '';
    let embed = new Discord.RichEmbed()
      .setAuthor('시댕봇 도움말', helpImg)
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
  } else if(message.content.startsWith('-공지2')) {
    if(checkPermission(message)) return
    if(message.member != null) { // 채널에서 공지 쓸 때
      let contents = message.content.slice('-공지2'.length);
      let embed = new Discord.RichEmbed()
        .setAuthor('시댕봇 공지')
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
  } else if(message.content.startsWith('!공지')) {
    if(checkPermission(message)) return
    if(message.member != null) { // 채널에서 공지 쓸 때
      let contents = message.content.slice('!공지'.length);
      message.member.guild.members.array().forEach(x => {
        if(x.user.bot) return;
        x.user.send(`<@${message.author.id}> ${contents}`);
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
if (message.content.startsWith("시발", "개새끼", "병신", "무요")) {
message.delete();
message.channel.send("욕하지마 개새끼야")
}
});

client.login(token);
