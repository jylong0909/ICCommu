<template>
  <div id="personCar">
    <Pheader mesFather="实时人车监控"></Pheader>
    <div id="main">
      <div id="main-left" class="fl">
        <PersonFlow :alarmNum = 'alarm_num' :personNum = 'person_num' :inNum = 'in_num' :outNum = 'out_num'></PersonFlow>
        <PersonTrack @personDataChange = 'person_data_change'></PersonTrack>
      </div>
      <div id="main-right" class="fr">
        <CarFlow :car_in = 'carIn' :car_out = 'carOut' :total_cap = 'cap' :is_parking = 'isParking'></CarFlow>
        <CarTrack @carDataChange = 'car_data_change'></CarTrack>
      </div>
      <div id="main-center">
        <div id="rtsp">
          <PersonCarVedio></PersonCarVedio>
        </div>
        <div id="chat-show">
          <div id="person_warp">
            <PersonChart></PersonChart>
          </div>
          <div id="car_wrap">
            <CarChart></CarChart>
          </div>
        </div>
      </div>
    </div>
    <Pfooter></Pfooter>
  </div>
</template>

<script>
import Pheader from "../common/header/Pheader";
import PersonFlow from "../common/person/PersonFlow";
import PersonTrack from "../common/person/PersonTrack";
import CarFlow from "../common/car/CarFlow";
import CarTrack from "../common/car/CarTrack";
import PersonChart from "../common/person/PersonChart";
import CarChart from "../common/car/CarChart";
import Pfooter from "../common/footer/Pfooter";
import PersonCarVedio from "./PersonCarVedio/PersonCarVedio";
import { flowPersonToday, parkingSpot, car_num_list_data } from "@/mock/api";
export default {
  name: "personAcar",
  components: {
    Pheader,
    PersonFlow,
    PersonTrack,
    CarFlow,
    CarTrack,
    PersonChart,
    CarChart,
    Pfooter,
    PersonCarVedio
  },
  data() {
    return {
      in_num_origin: "",
      out_num_origin: "",
      alarm_num_origin: "",
      person_num_origin: "",
      in_num: "",
      out_num: "",
      alarm_num: "",
      person_num: "",
      carIn_origin: "",
      carOut_origin: "",
      carIn: "",
      carOut: "",
      cap: "",
      isParking: "",
      timeWes: ""
    };
  },
  mounted() {
    let _this = this;
    setData();
    this.timeWes = setInterval(function() {
      setData();
    }, 30 * 1000);
    function setData() {
      flowPersonToday()
        .then(response => {
          _this.in_num_origin = response.data.data.inNum;
          _this.out_num_origin = response.data.data.outNum;
          _this.alarm_num_origin = response.data.data.alarmNum;
          _this.person_num_origin = response.data.data.personNum;
          _this.in_num = _this.toThousands(response.data.data.inNum);
          _this.out_num = _this.toThousands(response.data.data.outNum);
          _this.alarm_num = _this.numberReset(4, response.data.data.alarmNum);
          _this.person_num = _this.numberReset(4, response.data.data.personNum);
        })
        .catch(error => {
          console.log(error);
        });
      car_num_list_data()
        .then(response => {
          _this.carIn_origin = response.data.data.in;
          _this.carOut_origin = response.data.data.out;
          _this.carIn = _this.numberReset(4, response.data.data.in);
          _this.carOut = _this.numberReset(4, response.data.data.out);
        })
        .catch(error => {
          console.log(error);
        });
      parkingSpot()
        .then(response => {
          _this.cap = _this.toThousands(response.data.data.cap);
          _this.isParking = _this.toThousands(response.data.data.cap_used);
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  methods: {
    numberReset(len, num) {
      var substitute = len - String(num).length;
      var numStart = "";
      for (var i = 0; i < substitute; i++) {
        numStart += "0";
      }
      num = (numStart + num).split("");
      return num;
    },
    toThousands(num) {
      return (num || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, "$1,");
    },
    person_data_change(data) {
      this.alarm_num_origin =
        Number(this.alarm_num_origin) + Number(data.alarm_num);
      this.alarm_num = this.numberReset(4, this.alarm_num_origin);
      this.in_num_origin =
        Number(this.in_num_origin) + Number(data.in_num);
      this.in_num = this.toThousands(this.in_num_origin);
      this.out_num_origin =
        Number(this.out_num_origin) + Number(data.out_num);
      this.out_num = this.toThousands(this.out_num_origin);
    },
    car_data_change(data) {
      this.carIn_origin = Number(this.carIn_origin) + Number(data.in);
      this.carIn = this.numberReset(4, this.carIn_origin);
      this.carOut_origin = Number(this.carOut_origin) + Number(data.out);
      this.carOut = this.numberReset(4, this.carOut_origin);
    }
  },
  beforeDestroy() {
    clearInterval(this.timeWes);
  }
};
</script>

<style scoped>
#personCar {
  width: 1920px;
  position: relative;
}
#main {
  padding: 20px 41px 39px 40px;
}
#main-center {
  width: 1053px;
  margin-left: 393px;
}
#rtsp {
  width: 1053px;
  height: 593px;
  margin-bottom: 20px;
  background: url(/static/IMG/rtspBj.png);
}
#car_wrap {
  position: absolute;
  right: 0px;
  top: 0px;
}
#person_warp {
  margin-right: 520px;
}
#chat-show {
  position: relative;
}
</style>
