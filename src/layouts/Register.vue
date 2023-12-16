<script setup>
  import { ref, reactive, computed, onMounted } from 'vue';
  import { useDisplay } from 'vuetify'
  import { useAppStore } from '@/store/app'
  import { useRouter } from 'vue-router';
  import VueDatePicker from '@vuepic/vue-datepicker';
  import '@vuepic/vue-datepicker/dist/main.css'


  // VUE PICKER
  const date = ref(new Date());
  const format = (date) => {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();


  return `${year}-${month}-${day}`;
}

  // Retorna se o tamanho de tela é de um dispositivo móvel
  // Referência: https://vuetifyjs.com/en/features/display-and-platform/
  const { mobile } = useDisplay();

// SEX INPUT
const selectedSex = ref(null);

const sexOptions = [
 'M',
 'F' ,
 '',
];


  // Carrega o controlador de rotas
  // Referência: https://router.vuejs.org/guide/essentials/named-routes.html#Named-Routes
  const router = useRouter();

  // Carrega o contgrolador do store pinia
  // Referencia: https://pinia.vuejs.org/core-concepts/state.html#Accessing-the-state
  const appStore = useAppStore();

  // Variáveis da tela
  // Referencia: https://vuejs.org/guide/essentials/reactivity-fundamentals.html#declaring-reactive-state-1
  const form_valid = ref(true);
  const password_visible = ref(false);
  const user = reactive({
    nome: '',
    email: '',
    senha: '',
    confirmarSenha: '',
    data_nasc: '',
    sexo: '',
    telefone: '', 
  })

  // Computed Properties
  // Retorna um valor calculado
  // Referência: https://vuejs.org/guide/essentials/computed.html
  const elevation = computed(() => {
    return mobile.value ? '0' : '8';
  })

  // Cria uma regra de validação do formulário
  // Referência: https://vuetifyjs.com/en/components/forms/#rules
  const campoObrigatorio = value => !!value || "Campo obrigatório";


  // Funções da tela de login
  const register = async function() {

    user.data_nasc = format(date.value); 

    const autenticated_user = await appStore.registerUser(user);

    if (!autenticated_user) {
      alert('Usuario não pode ser cadastrado');
    } else {
      alert('Usuario Cadastrado com sucesso');
      router.push({ name: '/login' });
    }

  }

  const LoginRouter = () => {
    router.push({name: 'Login'})
  }


</script>

<template>
  <div class="tela-cheia" :class="{ 'fundo-cinza': !mobile }">

      <v-card
      class="pa-10"
      width="100%"
      max-width="448px"
      rounded="xl"
      
      :elevation="elevation"
      >
      
      <div class="d-flex justify-center">
        <v-img class="mt-6 mb-10" max-width="228" src="../../public/logo.png"></v-img>
      </div>

      <v-form v-model="form_valid" ref="form">

      
        <div class="text-subtitle-1 text-medium-emphasis">Nome</div>
      
        <v-text-field
          v-model="user.nome"
          density="compact"
          placeholder="Digite o seu nome"
          prepend-inner-icon="mdi-account-circle"
          variant="outlined"
          required
          autofocus
      
          :rules="[campoObrigatorio]"
        ></v-text-field>


          <div class="text-subtitle-1 text-medium-emphasis">Email</div>

          <v-text-field
            v-model="user.email"
            density="compact"
            placeholder="Digite o seu email"
            prepend-inner-icon="mdi-email-box"
            variant="outlined"
            required
            autofocus

            :rules="[campoObrigatorio]"
          ></v-text-field>

          <div class="text-subtitle-1 text-medium-emphasis">
            Senha
          </div>

          <v-text-field
            v-model="user.senha"
            density="compact"
            placeholder="Digite a senha"
            prepend-inner-icon="mdi-lock-outline"
            variant="outlined"
            required

            :rules="[campoObrigatorio]"
            :append-inner-icon="password_visible ? 'mdi-eye-off' : 'mdi-eye'"
            :type="password_visible ? 'text' : 'password'"

            @click:append-inner="password_visible = !password_visible"
          ></v-text-field>

          <div class="text-subtitle-1 text-medium-emphasis">
            Confirmar senha
          </div>

          <v-text-field
            v-model="user.confirmarSenha"
            density="compact"
            placeholder="Digite a senha"
            prepend-inner-icon="mdi-lock-outline"
            variant="outlined"
            required

            :rules="[campoObrigatorio]"
            :type="password_visible ? 'text' : 'password'"

            @click:append-inner="password_visible = !password_visible"
          ></v-text-field>

          <div class="text-subtitle-1 text-medium-emphasis">
            Telefone
          </div>

          <v-text-field
            v-model="user.telefone"
            density="compact"
            placeholder="Digite o seu telefone"
            prepend-inner-icon="mdi-phone"
            variant="outlined"
            required

            :rules="[campoObrigatorio]"

          ></v-text-field>
          
          <div class="text-subtitle-1 text-medium-emphasis">
            Ano de nascimento
          </div>

          
          <VueDatePicker v-model="user.data_nasc" class="input-calendar" :format="format" placeholder="Digite seu aniversário"/>
        
          <div class="text-subtitle-1 text-medium-emphasis mt-5">
      Sexo
    </div>

    <v-select
      v-model="user.sexo"
      :items="sexOptions"
      label="Selecione o sexo"
      dense
      item-text="label"
      item-value="value"
      class="mt-1"
    ></v-select>

          <v-btn
            block
            class="my-8"
            color="#14609e"
            size="large"
            variant="elevated"

            :disabled="form_valid === false"

            @click="register"
            rounded="xl"
          >
            Cadastro
          </v-btn>
          
          <v-btn
            block
            class="my-8"
            color="white"
            size="large"
            variant="elevated"


            @click="LoginRouter"
            rounded="xl"
          >
            Ir para o login
          </v-btn>
        </v-form>
      </v-card>
  </div>
</template>


<style>

.tela-cheia {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.fundo-cinza {
  background-color: #FAFAFA;
}



.input-calendar .vdp-datepicker-input {
  border: 1px solid #000;
}

.v-select {
  border-radius: 50;
}

</style>
