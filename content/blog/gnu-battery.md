---
author: "Akhil Pandey"
date: 2016-09-12
title: Tuning the GNU/Linux System 
best: true
---

I always used to find myself in a difficult situation when I had to travel and work. The main reason for this is my machine had a GNU/Linux based distro running and I couldn’t stay away from a charging spot for more than two hours. I always was intrigued to explore this segment and solve this very problem in order to better my travel experience. 
Basically there are couple of things to be kept in mind before you go out and try the tricks mentioned here, Consider them basics; So they are : 
* The Kernel plays a major role in providing support to enhance battery life. So I have tested the battery saving hacks on kerne
l’s :

* 4.2.x
* 4.2.x
* 4.7* Arch

So make sure you have kernel above 4.x.x as they show a significant improvement with latest set of processors 

* Apart from the kernel the next major role is played by the distro, so it is very important to have a desktop environment that is not bloated will unecessary software. For example LXDE, Xfce, Xmonad, OpenBox are the options you might want to look at if you are keen on battery and minimalism
* The distro comes next, you might think that having a light weight Desktop environment will do your job, although your job is only halfdone. So in order to complete the list of basics you must ensure that you have a light weight Distro like Arch Linux, Arch Bang, Xubuntu, Lubuntu. Don’t expect these hacks to work properly on Unity, Gnome


**My setup :**

I basically use Arch linux + XFCE with the latest kernel; 
```shell
Linux machine 4.7.2-1-ARCH #1 SMP PREEMPT Sat Aug 20 23:02:56 CEST 2016 x86_64 GNU/Linux
```

Things to be installed before starting this: 

**For Arch** 
```shell
pacman -S tlp
pacman -S powertop
pacman -S intel-ucode
pacman -S yaourt
yaourt thermald
```

**For *buntu**
```shell
apt-get install tlp
apt-get install powertop
# Thermald is installed by default in *buntu based distro’s
```

Before I start let me just say couple of things which are to be kept in mind whilst copying/pasting the commands listed in the article. 

* There might be a command which might not be suitable to your machine or your hardware in specific, so kindly read about the same before you unleash your fingers
* Some of these commands might be very handy or might be not at all, since we have to take many things like kernel support etc into consideration and also rather than having a thought that this would be mind-blowingexpect the outcome to be mildly good.
* If you are new to GNU/Linux please make sure that you have a reference by your side whilst going through this article.

**Let’s get started :** 

So considering that you have installed the afore mentioned packages, let’s get started: 


**Aspect 1 :** `brightness*`

Although you might have the feeling that you know this thing from a long time, there are some things to ensure that you use this method the right way. So open the terminal and type : 
```shell
cat /sys/class/backlight/intel_backlight/brightness
```

Typing the above command gives you the brightness which your screen is currently set to, now go ahead and type: 

```shell
cat /sys/class/backlight/intel_backlight/max_brightness
```

Typing the above command gives you the maximum brightness that can be set to your machine. So now the important part to be noted here is, make sure that your current brightness is set to nearly 8.5% of your maximum brightness. Making sure that you set this to that value you can increase the battery time invariably. 

**Aspect 2:** `Events & Services`

The next important part of the process is using the services which system wants and removing the things which are not necessary. So things like bluetooth, mongodb, mysql, rethinkdb, etc…. could be disabled. Note that the idea here is not about disabling a specific service or distinguishing them, although it is basically about stopping all the unwanted services. Turn them off by typing 
```shell
# Arch linus
systemctl —failed —all
systemctl stop service_name

# Ubuntu based distros
service service_name stop
```

Make sure that cursor blink mode is disabled, since this event is responsible for consuming a significant amount of power. Type the following command : 
```shell
# Any distro doesn’t matter
gconftool-2 —type string —set /apps/gnome-terminal/profiles/Default/cursor_blink_mode off
```

The above command gconftool-2 is basically a configuration tool for changing the default values in a system. All the preferences are basically key:value pairs. Typing the above command makes sure that cursor blinking mod is turned off. 

**Aspect 3 :** `Screensaver and display manager`

Assuming that you are using Xorg, there are couple of things which you might want to know so that there is a clear understanding of system’s power consumption policy when it goes down for a **suspend or screen blank**. Before you get started on this aspect, please have a look at the man page for xset. Now let’s go through what all should be done; 
```shell
# first check your config by typing
xset q

# if you have screen saver enabled disable that first
xset s off

# Next, disable power blanking and exposures
xset s noblank
xset s noexpose
```

Now that you have disabled screen saver and power blanking, the next step is regarding DPMS. If you want to know regarding DPMS  [click here](https://www.x.org/releases/X11R7.7/doc/xextproto/dpms.html) . So disable/enable DPMS depending upon your need. 

```shell
xset -dpms  // disables Energy star (DPMS)
xset +dpms  // enables  Energy star (DPMS)
```


**Aspect 4:** `Wireless and Network`

So most of the time we make sure that we are connected to the internet, thus making sure to optimize battery in this use case is a bit tough and challenging. 
```shell
# enable power saving using iwconfig
iwconfig card_label power on

# enable power saving using iw
iw card_label set power_save on

# configure dynamic power save timeout
iwconfig card_label power 100m
```

There are couple of things to be kept in mind after you type those : 
* There are some **atheros** chips that are configured for power save in the first place, so you might not observe much of a change in your battery life.
* Basically all Wireless cards use a significant amount of power, although when compared using **ethernet** over to **wifi** is better. So opt for ethernet if you have an option
* From system to system the battery drain is directly proportional to the card you use, so if you have a high transmit network card then these settings might not be effective to your overall battery time.
* Even though you go through all those above mentioned gruelling scenarios there is good chance that you might save upto 30-40 mins
Next, disable or kill bluetooth if you are not using it; 

```shell
# Arch linux
systemctl stop bluetooth.service

# Ubuntu based distros
service bluetooth stop
```


**Aspect 5:** `Hard drive`

It is basically the most important part of this entire process, so there are two approaches to ensure that you have power save enabled to your hard disk and you are not compromising on performance. So Linux gives you the feasibility to alter the hard drive spin down speed using the command hdparm. To know more about the command type `man hdparm`. 

```shell	
# To alter spindown timeout
hdparm -S {time} /dev/{name}

#spindown_time = 60  # 5 min
#spindown_time = 240 # 20 min
#spindown_time = 250 # 30 min
#spindown_time = 280 # 1 hour
#spindown_time = 340 # 2 hours
```

Next in queue comes a small but very good measure called noatime. So basically with noatime disabled the access times of all the directories and files in your file system are not really in your control, meaning even if you have your hard disk spindown time set, but imagine there is a read operation of a file from your cache, this essentially is registered as a normal read operation and it basically ensures that the hard disk is spinning all the time. So in order to negate this and ensure that this doesn’t null the effect of hdparm. Do the following: 

```shell
# Open fstab
vim /etc/fstab

# add noatime to your hard disk at the end of the line

# before
UUID=2e0e754e-7dc2-4c21-9101-b539b8a501a8  /       ext4   errors=remount-ro 0   1

# after
UUID=2e0e754e-7dc2-4c21-9101-b539b8a501a8  /       ext4   errors=remount-ro,*noatime* 0   1
```

Save the _etc_fstab and reboot your system in order to have it in effective usage. So now hdparm will be successfull at spinning down the hard drive when not in use. Moving ahead there is also some more things that could be done in order to ensure that an extra power saving flag is passed to the system. In order to do that; 

```shell
# Change the following from max_performance to min_power
echo min_power > /sys/class/scsi_host/host0/link_power_management_policy
echo min_power > /sys/class/scsi_host/host1/link_power_management_policy
echo min_power > /sys/class/scsi_host/host2/link_power_management_policy
```

Although this worked fine on some systems it is to be noted that when you are not in **AC** mode, i.e when you are using your system on battery the above commands might work just fine, but if you are facing any issues or if you feel that the Read write speeds are visibly slowed down, then alter the above three parameters by typing max_performance instead of min_power 


**Aspect 6:** `Audio devices`

So audio cards consume a significant amount of power when are in use, but there is no point in spending that when you are not using them. Thereby in order to ensure that the sound cards accepts a power saving mechanism just type; 
```shell
# Check the parameter first using cat
cat /sys/module/snd_hda_intel/parameters/power_save_controller

# now if it is N, then change it to Y
echo Y > /sys/module/snd_hda_intel/parameters/power_save_controller
```


**Aspect 7:** `Tools`

If you are an avid Linux user you might have come across the tools called powertop, tlp. These are two handy tools which complete this transaction. Consider them like the last piece of the puzzle. Provided that you have downloaded them there is pretty much nothing to configure with them, they can be used right away after installation. 

```shell
# Start tlp first
tlp start

# In order to use powertop efficiently first calibrate
powertop —calibrate

# Now auto tune powertop with regard to your system specs
powertop —auto-tune
```

**NOTE:** After you hit calibrate the screen will go blank, don’t worry

With that we basically complete all the basic aspects of power saving that are to be ensured. People who have a bit of expertise in this field might be wondering as to why I didn’t mention about CPU freq, Intel p-states etc. Well, after some research I found that tlp turns effective with usage and altering of C-states and P-states. So if you want to take a step ahead and alter modes like no_turbo , max_perf_pct etc, go ahead but I do want to mention that there is not much of significance as I have tried them out too. 
PS : If you are using nvidia driver instead of Xorg, then download the package nvidia-settings and change your power saving profiles over there. 

Thats it folks,
Happy Hacking !! 

